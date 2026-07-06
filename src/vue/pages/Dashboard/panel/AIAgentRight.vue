<template>
  <div class="agent-right">
    <!-- 消息区域 -->
    <div class="messages-area" ref="messageArea">
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
        <!-- 步骤卡片（含工具名+可折叠结果） -->
        <div v-if="msg.role === 'step'" class="step-card">
          <div class="card-header">
            <span class="card-step-num">步骤 {{ msg.step }}</span>
            <span class="card-tool-name">{{ formatToolName(msg.tool) }}</span>
          </div>
          <div class="card-body">
            <div class="card-line tool-line">🔧 {{ msg.tool === 'api_browser' ? '数据查询' : msg.tool }}</div>
            <!-- 结果可点击折叠 -->
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
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-wrapper">
        <textarea
          ref="inputRef"
          v-model="inputText"
          class="chat-input"
          rows="1"
          placeholder="输入你的问题，按 Enter 发送..."
          @keydown.enter.prevent="sendMessage"
          @input="autoResizeInput"
        ></textarea>
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
import { ref, nextTick } from "vue";
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
const messageArea = ref(null);
const inputRef = ref(null);
const inputText = ref("");
const loading = ref(false);
/** AbortController 用于停止 SSE 请求 */
let stopController = null;

/** 当前正在流式接收中的助手消息对象 */
let currentAssistantMsg = null;

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

function addStep(stepSeq, thought, tool, result) {
  const now = new Date();
  const time = now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0");
  store.aiMessages.push({ role: "step", step: stepSeq, thought, tool, result, collapsed: true, time });
}

function toggleResult(msg) {
  msg.collapsed = !msg.collapsed;
}

function formatToolName(tool) {
  const map = { api_browser: "数据查询", web_search: "联网搜索", data_workspace: "数据工作区", skill_execute: "技能执行" };
  return map[tool] || tool;
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
    onStepDone(stepSeq, thought, tool, result) {
      addStep(stepSeq, thought, tool, result);
      scrollToBottom();
    },
    onToken(tokenText) {
      // 第一个 token 到达时创建消息气泡，隐藏进度指示器
      if (!currentAssistantMsg) {
        loading.value = false;
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
    onDone() {
      loading.value = false;
      currentAssistantMsg = null;
      // 刷新左侧历史列表
    },
    onError(err) {
      loading.value = false;
      currentAssistantMsg = null;
      addMessage("assistant", `抱歉，请求出错：${err}`);
      scrollToBottom();
    },
  });
}

/** 用户主动停止分析：中止 SSE 请求，后端的 SseEmitter 抛异常 → ReAct 引擎停止循环 */
function stopAnalysis() {
  if (stopController) {
    stopController.abort();
    stopController = null;
  }
  loading.value = false;
  addStep(999, "用户手动停止", "—", "⏹ 已停止分析");
  scrollToBottom();
}

/** 判断用户是否在底部附近（60px 阈值），自动滚动用 */
function isNearBottom() {
  if (!messageArea.value) return true;
  const el = messageArea.value;
  return el.scrollHeight - el.scrollTop - el.clientHeight < 60;
}

function scrollToBottom() {
  nextTick(() => {
    if (messageArea.value && isNearBottom()) {
      messageArea.value.scrollTop = messageArea.value.scrollHeight;
    }
  });
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
  overflow-y: auto;
  padding: 0 4px 12px 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scroll-behavior: smooth;
}

.messages-area::-webkit-scrollbar {
  width: 3px;
}

.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
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
</style>
