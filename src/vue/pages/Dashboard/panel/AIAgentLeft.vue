<template>
  <div class="agent-left">
    <!-- 功能列表 -->
    <div class="features-section">
      <div class="section-title">支持功能</div>
      <div class="features-list">
        <div
          class="feature-item"
          v-for="f in features"
          :key="f.name"
        >
          <div class="feature-icon" :style="{ color: f.color }">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" v-html="f.icon"></svg>
          </div>
          <div class="feature-text">
            <div class="feature-name">{{ f.name }}</div>
            <div class="feature-desc">{{ f.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用指南 -->
    <div class="guide-link">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="#60a5fa">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <a href="#" @click.prevent="openAgentGuide">AI 助手使用指南</a>
    </div>

    <!-- 历史对话 -->
    <div class="history-section">
      <div class="section-title">
        历史对话
        <span class="history-count">{{ store.conversationList.length }}</span>
      </div>
      <div class="new-chat-btn" @click="newConversation">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        新建对话
      </div>
      <div class="history-list">
        <div
          class="history-item"
          v-for="conv in store.conversationList"
          :key="conv.id"
          :class="{ active: conv.id === store.currentConversationId }"
          @click="selectConversation(conv)"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13v4l5 3-.5 1-5.5-3.5V7h1z"/>
          </svg>
          <span class="history-title">{{ conv.title }}</span>
          <span class="history-time">{{ formatTime(conv.updatedAt || conv.createdAt) }}</span>
          <span class="history-delete" @click.stop="confirmDelete(conv)" title="删除对话">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </span>
        </div>
        <div v-if="store.conversationList.length === 0" class="history-empty">
          暂无对话记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getAgentHistory, getAgentMessages, deleteAgentHistory } from "@/api/agent";

const store = useConfigStore();

  const features = [
    { name: "数据分析", desc: "碳排放数据多维分析与洞察", color: "#60a5fa",
      icon: '<path d="M3 17l5-4 4 4 7-7 2 2V5h-7l2 2-4 4-4-4-5 5z"/>' },
    { name: "报告生成", desc: "智能生成碳排放分析报告", color: "#34d399",
      icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>' },
    { name: "空间分析", desc: "缓冲区与叠加等空间分析", color: "#f59e0b",
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>' },
    { name: "政策咨询", desc: "碳达峰碳中和政策解读", color: "#2dd4bf",
      icon: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>' },
  ];

function formatTime(isoStr) {
  if (!isoStr) return "";
  const d = new Date(isoStr);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) {
    return d.getHours().toString().padStart(2, "0") + ":" +
           d.getMinutes().toString().padStart(2, "0");
  }
  if (diffDays === 1) return "昨天";
  if (diffDays < 7) return `${diffDays}天前`;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

async function selectConversation(conv) {
  if (conv.id === store.currentConversationId) return;
  try {
    const messages = await getAgentMessages(conv.id);
    store.currentConversationId = conv.id;
    store.aiMessages = messages.map(m => {
      // tool 角色 → 渲染为步骤卡片
      if (m.role === "tool" && m.metadata?.tool) {
        return {
          role: "step",
          step: m.metadata.step,
          tool: m.metadata.tool,
          thought: "调用 " + m.metadata.tool + " 工具",
          result: m.content,
          collapsed: true,
          time: formatTime(m.createdAt),
        };
      }
      return {
        role: m.role === "assistant" ? "assistant" : "user",
        text: m.content,
        time: formatTime(m.createdAt),
      };
    });
  } catch (e) {
    console.error("加载历史消息失败", e);
  }
}

async function confirmDelete(conv) {
  try {
    await ElMessageBox.confirm(
      `确定要删除对话「${conv.title}」吗？删除后不可恢复。`,
      "删除确认",
      { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" }
    );
    await deleteAgentHistory(conv.id);
    // 如果删除的是当前对话，清空聊天区
    if (store.currentConversationId === conv.id) {
      store.currentConversationId = null;
      store.aiMessages = [];
    }
    // 刷新列表
    store.conversationList = store.conversationList.filter(c => c.id !== conv.id);
    ElMessage.success("对话已删除");
  } catch {
    // 用户取消或删除失败
  }
}

function newConversation() {
  store.currentConversationId = null;
  store.aiMessages = [];
}

function openAgentGuide() {
  window.open(`${import.meta.env.BASE_URL}docs/doc-viewer.html?file=AGENT_GUIDE.md`, "_blank");
}

onMounted(async () => {
  try {
    const list = await getAgentHistory();
    store.conversationList = list;
  } catch (e) {
    console.error("加载历史列表失败", e);
  }
});
</script>

<style scoped>
.agent-left {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  overflow: hidden;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #e0e6f0;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.section-title .history-count {
  font-size: 18px;
  color: rgba(224, 230, 240, 0.4);
  font-weight: 700;
}

/* ── 功能列表 ── */
.features-section {
  flex-shrink: 0;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(15, 20, 32, 0.35);
  border: 1px solid rgba(59, 130, 246, 0.08);
  transition: all 0.2s ease;
}

.feature-item:hover {
  background: rgba(15, 20, 32, 0.5);
  border-color: rgba(59, 130, 246, 0.15);
}

.feature-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(15, 20, 32, 0.5);
}

.feature-text {
  min-width: 0;
}

.feature-name {
  font-size: 18px;
  font-weight: 700;
  color: #e0e6f0;
}

.feature-desc {
  font-size: 18px;
  color: rgba(224, 230, 240, 0.5);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── 新建对话按钮 ── */
.new-chat-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  margin-bottom: 6px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(224, 230, 240, 0.7);
  background: rgba(59, 130, 246, 0.08);
  border: 1px dashed rgba(59, 130, 246, 0.2);
  transition: all 0.2s ease;
}
.new-chat-btn:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  border-color: rgba(59, 130, 246, 0.35);
}

/* ── 使用指南 ── */
.guide-link {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.2s ease;
}

.guide-link:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

.guide-link a {
  color: #60a5fa;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.guide-link a:hover {
  color: #93c5fd;
  text-decoration: underline;
}


/* ── 历史对话 ── */
.history-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.history-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding-right: 2px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(224, 230, 240, 0.65);
  transition: all 0.2s ease;
  background: transparent;
}

.history-item:hover {
  background: rgba(59, 130, 246, 0.08);
  color: #bfdbfe;
}

.history-item.active {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
}

.history-title {
  flex: 1;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-time {
  font-size: 18px;
  color: rgba(224, 230, 240, 0.3);
  flex-shrink: 0;
}

.history-delete {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(224, 230, 240, 0.2);
  opacity: 0;
  transition: all 0.2s ease;
  cursor: pointer;
}
.history-item:hover .history-delete {
  opacity: 1;
  color: rgba(239, 68, 68, 0.5);
}
.history-delete:hover {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444 !important;
}

.history-empty {
  font-size: 18px;
  color: rgba(224, 230, 240, 0.3);
  text-align: center;
  padding: 20px 0;
}

.history-list::-webkit-scrollbar {
  width: 4px;
}
.history-list::-webkit-scrollbar-track {
  background: transparent;
}
.history-list::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
}
.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
</style>
