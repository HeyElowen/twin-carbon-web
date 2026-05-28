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

    <!-- 历史对话 -->
    <div class="history-section">
      <div class="section-title">
        历史对话
        <span class="history-count">{{ history.length }}</span>
      </div>
      <div class="history-list">
        <div
          class="history-item"
          v-for="(h, i) in history"
          :key="i"
          :class="{ active: i === activeHistory }"
          @click="activeHistory = i"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13v4l5 3-.5 1-5.5-3.5V7h1z"/>
          </svg>
          <span class="history-title">{{ h.title }}</span>
          <span class="history-time">{{ h.time }}</span>
        </div>
        <div v-if="history.length === 0" class="history-empty">
          暂无对话记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeHistory = ref(-1);

const features = [
  { name: "数据智能分析", desc: "分析各类碳排放数据，生成可视化报告", color: "#60a5fa",
    icon: '<path d="M21 3H3v18h18V3zm-2 16H5V5h14v14zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>' },
  { name: "减排策略建议", desc: "基于数据提供定制化减排方案", color: "#34d399",
    icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>' },
  { name: "异常数据检测", desc: "自动识别碳排放数据中的异常值", color: "#f59e0b",
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>' },
  { name: "碳排放趋势预测", desc: "预测未来碳排放趋势与峰值", color: "#a855f7",
    icon: '<path d="M16.5 3L13 9h4l-3.5 6H17l-4 6 3-4h-5l3.5-6H10l3.5-6H13l-4 6H5l3-4-1-2H2v14h20V3h-5.5z"/>' },
  { name: "报告自动生成", desc: "一键生成碳排放分析报告", color: "#f472b6",
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm2-6h8v2H8v-2zm0-4h5v2H8v-2zm0 8h8v2H8v-2z"/>' },
  { name: "政策合规咨询", desc: "碳达峰碳中和政策解读与合规建议", color: "#2dd4bf",
    icon: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>' },
];

const history = ref([
  { title: "2025年Q3碳排放分析", time: "10:30" },
  { title: "工业区减排方案讨论", time: "昨天" },
  { title: "政策合规问题咨询", time: "3天前" },
  { title: "异常数据检测报告", time: "5天前" },
  { title: "年度碳排放趋势预测", time: "2周前" },
]);
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
  font-size: 13px;
  font-weight: 600;
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
  font-size: 12px;
  color: rgba(224, 230, 240, 0.4);
  font-weight: 400;
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
  font-size: 14px;
  font-weight: 600;
  color: #e0e6f0;
}

.feature-desc {
  font-size: 13px;
  color: rgba(224, 230, 240, 0.5);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-time {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.3);
  flex-shrink: 0;
}

.history-empty {
  font-size: 14px;
  color: rgba(224, 230, 240, 0.3);
  text-align: center;
  padding: 20px 0;
}
</style>
