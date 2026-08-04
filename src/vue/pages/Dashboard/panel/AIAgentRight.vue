<template>
  <div class="agent-right">
    <!-- 消息区域 -->
    <el-scrollbar class="messages-area" ref="scrollbarRef" @scroll="onScroll">
      <!-- 无消息时显示 tips -->
      <template v-if="store.aiMessages.length === 0">
        <div class="tips-center">
          <div class="tips-avatar">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div class="tips-title">你好！我是 Carbon AI 助手</div>
          <div class="tips-subtitle">我可以帮你分析碳排放数据、提供决策建议，试试以下问题：</div>
          <div class="tips-grid">
            <div
              class="tip-chip"
              v-for="tip in tips"
              :key="tip"
              @click="sendTip(tip)"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {{ tip }}
            </div>
          </div>
        </div>
      </template>

      <!-- 消息列表 -->
      <div
        v-for="(msg, i) in store.aiMessages"
        :key="i"
        class="message"
        :class="msg.role"
      >
        <!-- 工具进度提示（interim：非正式回复，仅展示当前正在做什么） -->
        <div v-if="msg.role === 'progress'" class="progress-line">
          <span class="progress-icon">⏳</span>
          <span class="progress-text">{{ msg.text }}</span>
          <span class="progress-time">{{ msg.time }}</span>
        </div>

        <!-- 步骤合并组（同一轮 LLM 的多个工具调合同一张卡片） -->
        <div v-else-if="msg.role === 'step_group'" class="step-card">
          <div class="card-header">
            <span class="card-step-num">步骤 {{ msg.round + 1 }}</span>
            <span class="card-tool-count">{{ msg.steps.length }} 个操作</span>
          </div>
          <div class="card-body">
            <!-- 每个子步骤一行（始终可见）：图标 + 工具名 + 动作描述 -->
            <div v-for="(s, si) in msg.steps" :key="si" class="sub-step-line">
              <span class="sub-step-icon">{{ getToolIcon(s.tool) }}</span>
              <span class="sub-step-thought">
                <span class="sub-step-tool">{{ s.toolName }}</span>
                <span class="sub-step-text">{{ s.thought }}</span>
              </span>
            </div>
            <!-- 详情可点击折叠 -->
            <div class="result-toggle" @click="msg.collapsed = !msg.collapsed">
              <span class="toggle-icon">{{ msg.collapsed ? '▶' : '▼' }}</span>
              <span class="toggle-label">{{ msg.collapsed ? '查看详情' : '收起详情' }}</span>
            </div>
            <div v-if="!msg.collapsed" class="result-group">
              <div v-for="(s, si) in msg.steps" :key="si" class="sub-step-detail">
                <div v-if="s.paramsSummary || s.elapsedMs != null" class="sub-step-meta">
                  <span v-if="s.paramsSummary" class="sub-step-params">参数 {{ s.paramsSummary }}</span>
                  <span v-if="s.elapsedMs != null" class="sub-step-elapsed">⏱ {{ s.elapsedMs }}ms</span>
                </div>
                <pre class="sub-step-output">{{ s.result }}</pre>
              </div>
            </div>
          </div>
          <div class="message-time">{{ msg.time }}</div>
        </div>

        <!-- 旧版单步骤卡片（兼容历史数据） -->
        <div v-else-if="msg.role === 'step'" class="step-card">
          <div class="card-header">
            <span class="card-step-num">步骤 {{ msg.step }}</span>
          </div>
          <div class="card-body">
            <div class="card-line tool-line">{{ getToolIcon(msg.tool) }} {{ msg.thought || formatToolName(msg.tool) }}</div>
            <div class="result-toggle" @click="toggleResult(msg)">
              <span class="toggle-icon">{{ msg.collapsed ? '▶' : '▼' }}</span>
              <span class="toggle-label">{{ msg.collapsed ? '查看结果' : '收起结果' }}</span>
            </div>
            <div v-if="!msg.collapsed" class="card-line result-line">📊 {{ msg.result }}</div>
          </div>
          <div class="message-time">{{ msg.time }}</div>
        </div>

        <!-- 普通消息气泡 -->
        <template v-else>
          <div class="message-avatar">
            <svg v-if="msg.role === 'assistant'" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="message-bubble">
            <div class="message-text" v-html="renderMarkdown(msg.text)"></div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </template>
      </div>

      <!-- 分析中加载动画 + 停止按钮 -->
      <div v-if="loading" class="agent-loading">
        <div class="loading-dots">
          <span class="dot dot-1"></span>
          <span class="dot dot-2"></span>
          <span class="dot dot-3"></span>
        </div>
        <span class="loading-label">AI 正在分析...</span>
        <button class="stop-btn" @click="stopAnalysis" title="停止分析">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
          停止
        </button>
      </div>
    </el-scrollbar>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-wrapper">
        <textarea
          ref="inputRef"
          v-model="inputText"
          class="chat-input"
          rows="1"
          :placeholder="loading ? '' : '输入你的问题，按 Enter 发送...'"
          :disabled="loading"
          @keydown.enter.prevent="sendMessage"
          @input="autoResizeInput"
        ></textarea>
        <!-- 加载计时器：覆盖在输入框上 -->
        <div v-if="loading" class="input-timer" @click="stopAnalysis">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <span class="timer-text">{{ formatWorkingTime }}</span>
          <span class="timer-stop">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          </span>
        </div>
        <button
          class="clear-map-btn"
          title="清空地图上的空间分析图层和高亮"
          :disabled="loading"
          @click="clearMap"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
        </button>
        <button
          class="send-btn"
          :disabled="!inputText.trim()"
          @click="sendMessage"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { sendAgentMessage } from "@/api/agent";
import { marked } from "marked";
import DOMPurify from "dompurify";

// marked 配置：链接在新标签页打开
const renderer = new marked.Renderer();
renderer.link = ({ href, text }) => {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};
marked.setOptions({ renderer, breaks: true, gfm: true });

function renderMarkdown(text) {
  if (!text) return "";
  const html = marked.parse(text);
  return DOMPurify.sanitize(html);
}

const store = useConfigStore();
const scrollbarRef = ref(null);
const inputRef = ref(null);

// ★ 打开/切换对话：重置跟随状态 + 强制滚到底部（打开对话默认在最底）
watch(() => store.currentConversationId, () => {
  userScrolledUp = false;
  forceScrollToBottom();
});

// ★ 消息数量变化（历史加载 / 新增步骤卡）：贴底跟随
watch(() => store.aiMessages.length, () => scrollToBottom());
const inputText = ref("");
const loading = ref(false);
const workingSeconds = ref(0);
let workingTimer = null;
/** AbortController 用于停止 SSE 请求 */
let stopController = null;

/** 格式化工作秒数为 mm:ss */
const formatWorkingTime = computed(() => {
  const m = Math.floor(workingSeconds.value / 60);
  const s = workingSeconds.value % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
});

/** 当前正在流式接收中的助手消息对象 */
let currentAssistantMsg = null;

/** 当前正在执行中的工具调用状态（tool_call → tool_result → step_done 按序配对） */
let pendingTool = null;

const tips = [
  "分析当前季度碳排放数据",
  "哪些区域碳排放超标？",
  "建议减排措施有哪些？",
  "预测下季度碳排放趋势",
  "生成碳排放分析报告",
  "最新碳政策解读",
];

function addMessage(role, text) {
  const now = new Date();
  const time = now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0");
  store.aiMessages.push({ role, text, time });
}

function addStep(stepSeq, round, thought, tool, result, meta) {
  const now = new Date();
  const time = now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0");
  // 同一轮的多个工具合并为一个步骤组。
  // ★ 不能只检查最后一条消息：同一轮工具之间可能被 progress/assistant 隔开
  //   （如 iserver_spatial 内部 sendInterim），需从末尾向前找最近一个 step_group。
  let group = null;
  for (let i = store.aiMessages.length - 1; i >= 0; i--) {
    const m = store.aiMessages[i];
    if (m.role !== "step_group") continue; // 跳过 progress/assistant 等
    if (m.round === round) group = m;
    break; // 找到最近的 step_group（无论 round 是否匹配）即停
  }
  const stepItem = {
    step: stepSeq,
    thought,
    tool,
    result,
    toolName: formatToolName(tool),           // 卡片行显示的中文工具名
    paramsSummary: meta?.paramsSummary || "", // 工具参数摘要（来自 tool_call 事件）
    elapsedMs: meta?.elapsedMs ?? null,       // 工具执行耗时（来自 tool_result 事件）
  };
  if (group) {
    group.steps.push(stepItem);
    group.time = time;
  } else {
    store.aiMessages.push({
      role: "step_group",
      round,
      steps: [stepItem],
      collapsed: true,
      time
    });
  }
}

function toggleResult(msg) {
  msg.collapsed = !msg.collapsed;
}

function formatToolName(tool) {
  const map = {
    api_browser: "数据查询",
    web_search: "联网搜索",
    data_workspace: "数据工作区",
    skill_execute: "技能执行",
    exec_sandbox: "Python 脚本",
    iserver_spatial: "空间分析",
    frontend_cmd: "地图渲染",
    document: "文档",
  };
  return map[tool] || tool;
}

function getToolIcon(tool) {
  const icons = {
    api_browser: "📡",
    web_search: "🌐",
    data_workspace: "📂",
    skill_execute: "📋",
    exec_sandbox: "🐍",
    iserver_spatial: "🗺️",
    frontend_cmd: "🎯",
    document: "📄",
  };
  return icons[tool] || "🔧";
}

/**
 * 将 LLM 传入的工具参数 JSON 压缩成一行摘要（用于步骤详情展示）。
 * 过滤 _ 开头的内部字段（_conversationId 等），超长截断。
 */
function summarizeParams(tool, paramsStr) {
  try {
    const obj = paramsStr ? JSON.parse(paramsStr) : {};
    if (!obj || typeof obj !== "object") return paramsStr || "";
    const visible = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith("_")) continue; // 内部字段不展示
      visible[k] = v && typeof v === "object"
        ? JSON.stringify(v).substring(0, 60)
        : String(v);
    }
    const keys = Object.keys(visible);
    if (keys.length === 0) return "";
    const text = JSON.stringify(visible);
    return text.length > 100 ? text.substring(0, 100) + "…" : text;
  } catch {
    return paramsStr ? String(paramsStr).substring(0, 100) : "";
  }
}

function sendTip(tip) {
  inputText.value = tip;
  autoResizeInput();
  sendMessage();
}

/** 根据文本内容自动调整输入框高度 */
function autoResizeInput() {
  nextTick(() => {
    const el = inputRef.value;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  });
}

async function sendMessage() {
  const text = inputText.value.trim();
  if (!text || loading.value) return;
  inputText.value = "";
  // 输入框高度复位
  if (inputRef.value) {
    inputRef.value.style.height = "auto";
  }
  addMessage("user", text);
  await nextTick();
  scrollToBottom();

  // 开始 SSE 流式请求
  loading.value = true;
  workingSeconds.value = 0;
  workingTimer = setInterval(() => { workingSeconds.value++; }, 1000);
  await nextTick();
  scrollToBottom();

  currentAssistantMsg = null;
  stopController = new AbortController();
  await nextTick();
  scrollToBottom();

  sendAgentMessage(text, {
    signal: stopController.signal,
    conversationId: store.currentConversationId,
    onProgress(stage, label, intent, confidence, convId) {
      if (stage === "intent" && convId) {
        store.currentConversationId = convId;
        // 立即在左侧列表添加临时卡片
        if (!store.conversationList.some(c => c.id === convId)) {
          store.conversationList.unshift({ id: convId, title: "新对话…", createdAt: new Date().toISOString() });
        }
      }
      // 标题已生成
      if (stage === "title" && label && convId) {
        const card = store.conversationList.find(c => c.id === convId);
        if (card) card.title = label;
      }
    },
    // FC 步骤完成事件 —— 每步渲染一张卡片
    // ★ 过渡回复：工具执行完后 LLM 的自然语言反馈，显示在步骤卡片之后
    onInterim(text) {
      console.log("[Agent] interim received:", text?.substring(0, 50));
      // ★ 过渡回复时 agent 还在工作，不停止 loading
      const now = new Date();
      const time = now.getHours().toString().padStart(2, "0") + ":" +
                   now.getMinutes().toString().padStart(2, "0");
      // ★ 工具进度提示用独立 role="progress"，渲染成细灰条，不冒充正式回复气泡
      store.aiMessages.push({ role: "progress", text, time });
      scrollToBottom();
    },
    // ★ 工具开始调用：记录参数摘要，等待 step_done 时合并进卡片
    onToolCall(step, tool, params) {
      pendingTool = { tool, paramsSummary: summarizeParams(tool, params) };
    },
    // ★ 工具执行结果：补充耗时（step_done 到达前按顺序配对）
    onToolResult(step, tool, summary, elapsedMs) {
      if (pendingTool) pendingTool.elapsedMs = elapsedMs;
    },
    onStepDone(stepSeq, thought, tool, result, round) {
      const meta = pendingTool
        ? { paramsSummary: pendingTool.paramsSummary, elapsedMs: pendingTool.elapsedMs }
        : null;
      addStep(stepSeq, round, thought, tool, result, meta);
      pendingTool = null; // 该工具已渲染完成，清空等待下一个 tool_call
      scrollToBottom();
    },
    // ★ 实时渲染指令：frontend_cmd 工具执行时由后端 SSE 异步推送，不等对话结束
    onRenderCommand(cmd) {
      console.log("[Render] 实时收到渲染指令:", cmd.action);
      store.setRenderCommand(cmd);
    },
    // ★ Agent 完成：渲染指令已改为 SSE 实时推送，无需再轮询 pending-render
    onDone() {
      stopLoading();
      currentAssistantMsg = null;
    },
    onToken(tokenText) {
      // 第一个 token 到达时创建消息气泡，隐藏进度指示器
      if (!currentAssistantMsg) {
        stopLoading();
        const now = new Date();
        const time = now.getHours().toString().padStart(2, "0") + ":" +
                     now.getMinutes().toString().padStart(2, "0");
        store.aiMessages.push({ role: "assistant", text: "", time });
        // ★ 关键：从 store 里取回响应式代理对象，后续 text 修改才能触发重新渲染
        currentAssistantMsg = store.aiMessages[store.aiMessages.length - 1];
      }
      currentAssistantMsg.text += tokenText;
      scrollToBottom();
    },
    onError(err) {
      stopLoading();
      currentAssistantMsg = null;
      addMessage("assistant", `抱歉，请求出错：${err}`);
      scrollToBottom();
    },
  });
}

/** 停止加载状态 + 计时器 */
function stopLoading() {
  if (workingTimer) {
    clearInterval(workingTimer);
    workingTimer = null;
  }
  loading.value = false;
}
function stopAnalysis() {
  if (stopController) {
    stopController.abort();
    stopController = null;
  }
  stopLoading();
  addStep(999, 999, "用户手动停止", "—", "⏹ 已停止分析");
  scrollToBottom();
}

/** 手动清空地图上的空间分析图层和建筑高亮 */
function clearMap() {
  store.setRenderCommand({ action: "clear_spatial" });
  console.log("[Map] 手动清空地图");
}

/** 检测用户主动离开底部的阈值（px）：手动滚上去超过该距离视为"在看历史"，停止跟随 */
const SCROLL_NEAR_BOTTOM_PX = 40;

/** 用户是否主动滚离了底部（true = 在看历史，新消息到达不打扰） */
let userScrolledUp = false;

/** wrap 滚动事件：追踪用户是否主动离开底部。
 *  ★ 不用"scrollHeight 差值"判断贴底——流式追加时 scrollHeight 持续增长，
 *    scrollTop 追不上导致差值恒大于阈值，永不跟随。改为追踪用户主动滚动。 */
function onScroll() {
  const sb = scrollbarRef.value;
  if (!sb || !sb.wrapRef) return;
  const el = sb.wrapRef;
  userScrolledUp = el.scrollHeight - el.scrollTop - el.clientHeight >= SCROLL_NEAR_BOTTOM_PX;
}

/** 强制滚动到消息列表最底部（打开对话/加载历史时用，不看位置）。
 *  用超大值让浏览器 clamp 到最大滚动位置，规避 scrollHeight 读取滞后的竞态。 */
function forceScrollToBottom() {
  nextTick(() => {
    const sb = scrollbarRef.value;
    if (!sb || !sb.wrapRef) return;
    sb.setScrollTop(Number.MAX_SAFE_INTEGER);
  });
}

/** 新消息到达时贴底跟随：用户停留在底部则自动滚到底，在看历史则不打扰 */
function scrollToBottom() {
  if (userScrolledUp) return;
  forceScrollToBottom();
}
</script>

<style scoped>
.agent-right {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* ── 消息区域 ── */
.messages-area {
  flex: 1;
  min-height: 0;
}

/* el-scrollbar 内容层：消息纵向排列 */
.messages-area :deep(.el-scrollbar__view) {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 4px 12px 4px;
}

/* el-scrollbar 滚动条（细蓝条，替代原 webkit 自定义） */
.messages-area :deep(.el-scrollbar__bar.is-vertical) {
  width: 4px;
}
.messages-area :deep(.el-scrollbar__thumb) {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
}
.messages-area :deep(.el-scrollbar__thumb:hover) {
  background: rgba(59, 130, 246, 0.5);
}

/* ── Tips 中心区域 ── */
.tips-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 16px;
}

.tips-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(52, 211, 153, 0.2));
  color: #60a5fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(59, 130, 246, 0.2);
}

.tips-title {
  font-size: 16px;
  font-weight: 700;
  color: #e0e6f0;
  text-align: center;
}

.tips-subtitle {
  font-size: 14px;
  color: rgba(224, 230, 240, 0.5);
  text-align: center;
  margin-bottom: 4px;
}

.tips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 360px;
}

.tip-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: rgba(224, 230, 240, 0.75);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tip-chip:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  color: #bfdbfe;
  transform: translateY(-1px);
}

/* ── 消息气泡 ── */
.message {
  display: flex;
  gap: 8px;
  max-width: 90%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
}

.message.assistant .message-avatar {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.message.user .message-avatar {
  background: rgba(52, 211, 153, 0.15);
  color: #34d399;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.7;
}

.message.assistant .message-bubble {
  background: rgba(15, 20, 32, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.1);
  color: rgba(224, 230, 240, 0.85);
  border-top-left-radius: 4px;
}

.message.user .message-bubble {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
  border-top-right-radius: 4px;
}

.message-text {
  line-height: 1.7;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* 用户纯文本消息也防止溢出 */
.message.user .message-text {
  white-space: pre-wrap;
}

/* ── Markdown 渲染样式 ── */
.message-text h1,
.message-text h2,
.message-text h3,
.message-text h4 {
  margin: 8px 0 4px;
  color: #e0e6f0;
  font-weight: 600;
}
.message-text h1 { font-size: 18px; }
.message-text h2 { font-size: 16px; }
.message-text h3 { font-size: 15px; }
.message-text h4 { font-size: 14px; }

.message-text p {
  margin: 4px 0;
  &:first-child { margin-top: 0; }
  &:last-child { margin-bottom: 0; }
}

.message-text ul,
.message-text ol {
  margin: 4px 0;
  padding-left: 20px;
}
.message-text li {
  margin: 2px 0;
}
.message-text li > p {
  margin: 2px 0;
}

.message-text code {
  font-family: "Cascadia Code", "Fira Code", "JetBrains Mono", monospace;
  font-size: 13px;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  color: #93c5fd;
}

.message-text pre {
  margin: 8px 0;
  border-radius: 8px;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.1);
}
.message-text pre code {
  display: block;
  padding: 12px 14px;
  background: transparent;
  color: #e0e6f0;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.message-text blockquote {
  margin: 8px 0;
  padding: 6px 12px;
  border-left: 3px solid rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0 6px 6px 0;
  color: rgba(224, 230, 240, 0.75);
}

.message-text a {
  color: #fbbf24;
  text-decoration: none;
  border-bottom: 1px solid rgba(251, 191, 36, 0.35);
  transition: all 0.2s;
}
.message-text a:hover {
  color: #fcd34d;
  border-bottom-color: rgba(251, 191, 36, 0.7);
}

.message-text strong {
  color: #f0f4ff;
  font-weight: 600;
}

.message-text hr {
  border: none;
  border-top: 1px solid rgba(59, 130, 246, 0.15);
  margin: 12px 0;
}

.message-text table {
  border-collapse: collapse;
  width: 100%;
  margin: 8px 0;
  font-size: 13px;
}
.message-text th,
.message-text td {
  padding: 6px 10px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  text-align: left;
}
.message-text th {
  background: rgba(59, 130, 246, 0.1);
  color: #bfdbfe;
  font-weight: 600;
}

.message-text img {
  max-width: 100%;
  border-radius: 6px;
  margin: 8px 0;
}

.message-time {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.3);
  margin-top: 4px;
}

.message.user .message-time {
  text-align: right;
}

/* ── 工具进度提示（interim：非正式回复，细灰条） ── */
.progress-line {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  margin: 2px 0;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px dashed rgba(59, 130, 246, 0.16);
  max-width: 100%;
}
.progress-icon {
  font-size: 12px;
  flex-shrink: 0;
}
.progress-text {
  font-size: 12px;
  color: rgba(147, 197, 253, 0.65);
  line-height: 1.4;
  word-break: break-word;
  flex: 1;
}
.progress-time {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.25);
  flex-shrink: 0;
}

/* ── 步骤卡片（每步一张） ── */
.step-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  margin: 3px 0;
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  background: rgba(15, 20, 32, 0.3);
  width: 100%;
  border-left: 3px solid rgba(59, 130, 246, 0.35);
}

.step-card .card-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.step-card .card-step-num {
  font-size: 11px;
  font-weight: 600;
  color: rgba(147, 197, 253, 0.7);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.step-card .card-tool-name {
  font-size: 11px;
  color: rgba(251, 191, 36, 0.6);
  margin-left: auto;
}
.step-card .card-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-card .card-line {
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
  padding: 2px 0;
}

.step-card .tool-line {
  color: rgba(251, 191, 36, 0.75);
  font-size: 12px;
}

.step-card .result-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
  cursor: pointer;
  font-size: 12px;
  color: rgba(147, 197, 253, 0.5);
  transition: color 0.2s;
  user-select: none;
}
.step-card .result-toggle:hover {
  color: rgba(147, 197, 253, 0.8);
}
.step-card .toggle-icon {
  font-size: 10px;
}
.step-card .toggle-label {
  font-size: 12px;
}

.step-card .result-line {
  color: rgba(52, 211, 153, 0.75);
  font-size: 12px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  margin-top: 2px;
}

.step-card .message-time {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.25);
  margin-top: 2px;
}

/* ── 步骤组特有样式 ── */
.card-tool-count {
  font-size: 11px;
  color: rgba(147, 197, 253, 0.5);
  margin-left: auto;
}
.sub-step-line {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.06);
}
.sub-step-line:last-child {
  border-bottom: none;
}
.sub-step-icon {
  flex-shrink: 0;
  font-size: 13px;
  width: 20px;
  text-align: center;
}
.sub-step-thought {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  /* 浅色文字放在父层：即使子元素样式缺失，也不会回落到黑色 */
  font-size: 13px;
  color: rgba(224, 230, 240, 0.8);
  line-height: 1.4;
}
.sub-step-tool {
  flex-shrink: 0;
  padding: 0 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(251, 191, 36, 0.85);
  background: rgba(251, 191, 36, 0.1);
}
.sub-step-text {
  color: inherit; /* 继承 .sub-step-thought 的浅色 */
  word-break: break-word;
}
.result-group {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sub-step-detail {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  overflow: hidden;
}
.sub-step-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.08);
  font-size: 11px;
  color: rgba(147, 197, 253, 0.6);
}
.sub-step-params {
  word-break: break-word;
  flex: 1;
  min-width: 0;
}
.sub-step-elapsed {
  flex-shrink: 0;
  color: rgba(224, 230, 240, 0.4);
}
.sub-step-output {
  margin: 0;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(52, 211, 153, 0.75);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
}

/* ── 加载动画 + 停止按钮 ── */
.agent-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin: 4px 0;
  border-radius: 10px;
  background: rgba(15, 20, 32, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.08);
}

.loading-dots {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #60a5fa;
  animation: dotPulse 1.4s ease-in-out infinite;
}
.dot-2 { animation-delay: 0.2s; }
.dot-3 { animation-delay: 0.4s; }

@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.1); }
}

.loading-label {
  font-size: 13px;
  color: rgba(224, 230, 240, 0.55);
  flex: 1;
}

.stop-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  background: rgba(239, 68, 68, 0.08);
  color: rgba(239, 68, 68, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  font-family: inherit;
  white-space: nowrap;
}
.stop-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}
.stop-btn:active {
  transform: scale(0.95);
}

/* ── 输入区域 ── */
.input-area {
  flex-shrink: 0;
  padding-top: 10px;
  border-top: 1px solid rgba(59, 130, 246, 0.08);
}

.input-wrapper {
  display: flex;
  position: relative;
  align-items: center;
  gap: 8px;
  background: rgba(15, 20, 32, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 10px;
  padding: 4px;
  transition: border-color 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: rgba(59, 130, 246, 0.4);
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #e0e6f0;
  font-size: 13px;
  padding: 8px 10px;
  font-family: inherit;
  resize: none;
  line-height: 1.5;
  max-height: 120px;
  overflow-y: auto;
}

.chat-input::placeholder {
  color: rgba(224, 230, 240, 0.3);
}

/* ── 输入框加载计时器 ── */
.input-timer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  color: rgba(224, 230, 240, 0.45);
  cursor: pointer;
  border-radius: 10px;
  background: rgba(15, 20, 32, 0.6);
  transition: all 0.2s ease;
}
.input-timer:hover {
  background: rgba(15, 20, 32, 0.75);
}
.timer-text {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: rgba(224, 230, 240, 0.6);
  letter-spacing: 0.5px;
}
.timer-stop {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  color: rgba(239, 68, 68, 0.45);
  background: rgba(239, 68, 68, 0.06);
  transition: all 0.2s ease;
}
.input-timer:hover .timer-stop {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
}

.send-btn {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.send-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.clear-map-btn {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(148, 163, 184, 0.06);
  color: rgba(148, 163, 184, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.clear-map-btn:hover:not(:disabled) {
  background: rgba(148, 163, 184, 0.12);
  border-color: rgba(148, 163, 184, 0.3);
  color: #cbd5e1;
}
.clear-map-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
</style>
