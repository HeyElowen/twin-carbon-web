import { useAuthStore } from "@/js/stores/useAuthStore";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/**
 * 向 Agent 发送消息，通过 SSE 流式接收回复
 *
 * @param {string} message - 用户输入
 * @param {Object} options
 * @param {string} options.conversationId - 对话 ID（第一轮传空，后端生成后通过 onProgress 返回）
 * @param {(text: string) => void} options.onToken - 收到一个 token 时回调
 * @param {(stage: string, label: string, intent: string, confidence: number, conversationId: string) => void} options.onProgress - 进度事件
 * @param {() => void} options.onDone - 流结束
 * @param {(err: string) => void} options.onError - 出错
 * @param {function} options.onInterim - 过渡回复（工具步骤之间的 LLM 自然语言过渡）
 * @param {(step: number, text: string) => void} options.onThought - ReAct 思考步骤
 * @param {(step: number, tool: string, params: object) => void} options.onToolCall - 工具调用（step 为 LLM 轮次）
 * @param {(step: number, tool: string, summary: string, elapsedMs: number) => void} options.onToolResult - 工具执行结果（含耗时）
 * @param {(round: number, thought: string, tool: string, result: string) => void} options.onStepDone - ReAct 单步完成（前端据此渲染一张卡片）
 * @param {AbortSignal} options.signal - 用于取消请求的 AbortSignal
 */
export function sendAgentMessage(message, { conversationId, onToken, onProgress, onDone, onError, onInterim, onThought, onToolCall, onToolResult, onStepDone, signal }) {
  const authStore = useAuthStore();

  fetch(`${API_BASE}/agent/stream`, {
    method: "POST",
    signal, // <-- 支持取消
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token || ""}`,
    },
    body: JSON.stringify({
      userId: authStore.username || "anonymous",
      conversationId: conversationId || null,
      message,
    }),
  }).then(async (response) => {
    if (!response.ok) {
      onError?.(`请求失败: ${response.status}`);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // 按行解析 SSE 数据
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // 最后一段可能不完整，留到下次

      let currentEvent = "";
      for (const line of lines) {
        if (line.startsWith("event:")) {
          currentEvent = line.slice(6).trim();
        } else if (line.startsWith("data:")) {
          // Spring 的 SseEmitter 可能输出 data:{"key":"val"}（无空格）
          // 也可能输出 data: {"key":"val"}（有空格），两种都兼容
          const dataStr = line.slice(5).trim();
          handleEvent(currentEvent, dataStr, { onToken, onProgress, onDone, onError, onInterim, onStepDone });
        }
      }
    }
  }).catch((err) => {
    // 用户主动中止不触发 onError（前端已处理停止逻辑）
    if (err.name === "AbortError") return;
    onError?.(err.message || "网络错误");
  });
}

/**
 * 获取当前用户的会话历史列表
 * GET /agent/history
 */
export async function getAgentHistory() {
  const authStore = useAuthStore();
  const res = await fetch(`${API_BASE}/agent/history`, {
    headers: { Authorization: `Bearer ${authStore.token || ""}` },
  });
  if (!res.ok) throw new Error(`获取历史失败: ${res.status}`);
  return res.json();
}

/**
 * 获取某个会话的全部消息
 * GET /agent/history/{convId}
 */
export async function getAgentMessages(conversationId) {
  const authStore = useAuthStore();
  const res = await fetch(`${API_BASE}/agent/history/${conversationId}`, {
    headers: { Authorization: `Bearer ${authStore.token || ""}` },
  });
  if (!res.ok) throw new Error(`获取消息失败: ${res.status}`);
  return res.json();
}

/**
 * 删除会话
 * DELETE /agent/history/{convId}
 */
export async function deleteAgentHistory(conversationId) {
  const authStore = useAuthStore();
  const res = await fetch(`${API_BASE}/agent/history/${conversationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authStore.token || ""}` },
  });
  if (!res.ok) throw new Error(`删除失败: ${res.status}`);
}

/**
 * 通过 REST 接口获取空间分析 GeoJSON 数据（供前端 Cesium 渲染）。
 * 前端在 agent 完成后通过 pending-render 获取 dataRef，再调此接口。
 * GET /agent/data/{dataRef}?convId=xxx
 */
export async function fetchSpatialData(dataRef, convId) {
  const authStore = useAuthStore();
  const params = new URLSearchParams();
  if (convId) params.set("convId", convId);
  const url = `${API_BASE}/agent/data/${encodeURIComponent(dataRef)}?${params.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${authStore.token || ""}` },
  });
  if (!res.ok) throw new Error(`获取空间数据失败: ${res.status}`);
  return res.json();
}

/**
 * 查询是否有待处理的渲染请求（agent 完成后调用）。
 * GET /agent/pending-render?convId=xxx
 * 返回 {dataRef, flyTo, action} 或 null
 */
export async function checkPendingRender(convId) {
  const authStore = useAuthStore();
  const params = new URLSearchParams();
  if (convId) params.set("convId", convId);
  const url = `${API_BASE}/agent/pending-render?${params.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${authStore.token || ""}` },
  });
  if (!res.ok) return null;
  return res.json();
}

function handleEvent(event, dataStr, handlers) {
  try {
    const data = JSON.parse(dataStr);

    switch (event) {
      case "progress":
        handlers.onProgress?.(data.stage, data.label, data.intent, data.confidence, data.conversationId);
        break;
      case "token":
        if (data.text) handlers.onToken?.(data.text);
        break;
      case "done":
        handlers.onDone?.();
        break;
      case "error":
        handlers.onError?.(data.errorMessage || "未知错误");
        break;
      // ReAct 事件
      case "thought":
        handlers.onThought?.(data.step, data.text);
        break;
      case "tool_call":
        handlers.onToolCall?.(data.step, data.tool, data.params);
        break;
      case "tool_result":
        handlers.onToolResult?.(data.step, data.tool, data.summary, data.elapsedMs);
        break;
      case "step_done":
        // step 为全局递增序号，round 为 LLM 轮次（用于前端合并同轮工具）
        handlers.onStepDone?.(data.step, data.thought, data.tool, data.result, data.round);
        break;
      case "interim":
        // 工具步骤之间的过渡回复（LLM 在工具结果上的自然语言反馈）
        handlers.onInterim?.(data.text);
        break;
      // render_command 已迁移为 REST 轮询模式，不再走 SSE
    }
  } catch {
    // JSON 解析失败则忽略该行
  }
}
