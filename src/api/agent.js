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
 */
export function sendAgentMessage(message, { conversationId, onToken, onProgress, onDone, onError }) {
  const authStore = useAuthStore();

  fetch(`${API_BASE}/agent/stream`, {
    method: "POST",
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
          handleEvent(currentEvent, dataStr, { onToken, onProgress, onDone, onError });
        }
      }
    }
  }).catch((err) => {
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
    }
  } catch {
    // JSON 解析失败则忽略该行
  }
}
