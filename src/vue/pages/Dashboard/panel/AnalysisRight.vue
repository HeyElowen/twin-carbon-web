<template>
  <div class="analysis-right">
    <!-- 极值分析 -->
    <div class="extreme-section">
      <div class="section-title">极值分析</div>

      <div class="extreme-cards">
        <div class="extreme-card highest">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 4L5 14H19L12 4ZM12 2L20 15H4L12 2Z" />
            </svg>
          </div>
          <div class="card-info">
            <div class="card-label">最高点</div>
            <div class="card-value">2.85 <span class="unit">吨</span></div>
            <div class="card-desc">工业区 · 2025-Q2</div>
          </div>
        </div>

        <div class="extreme-card lowest">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 20L5 10H19L12 20ZM12 22L20 9H4L12 22Z" />
            </svg>
          </div>
          <div class="card-info">
            <div class="card-label">最低点</div>
            <div class="card-value">0.12 <span class="unit">吨</span></div>
            <div class="card-desc">农业区 · 2025-Q1</div>
          </div>
        </div>
      </div>

      <div class="analysis-text">
        <p>
          时间线中极值出现的频率为 <strong>3次/年</strong>，主要集中于第二季度。
          结合当时经济活动及政策事件分析，极值出现原因推测为：
        </p>
        <ul>
          <li>季度初工业生产复苏，用电负荷激增</li>
          <li>夏季高温导致空调能耗大幅上升</li>
          <li>部分老旧设备能效未达新标</li>
        </ul>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="divider-line"></div>

    <!-- 针对性建议 -->
    <div class="suggestion-section">
      <div class="section-title">针对性建议</div>
      <div class="suggestion-list">
        <div
          class="suggestion-item"
          v-for="(item, i) in suggestions"
          :key="i"
        >
          <span class="suggestion-num">0{{ i + 1 }}</span>
          <div class="suggestion-content">
            <div class="suggestion-title">{{ item.title }}</div>
            <div class="suggestion-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const suggestions = [
  {
    title: "优化工业用电时段",
    desc: "建议将高耗能工序调整至低谷电价时段，降低峰时负荷。",
  },
  {
    title: "推进设备能效升级",
    desc: "对老旧高耗能设备进行变频改造或更换为一级能效设备。",
  },
  {
    title: "建立碳排预警机制",
    desc: "设置月度排放阈值，超限自动触发排查与整改流程。",
  },
];
</script>

<style scoped>
.analysis-right {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  overflow: hidden;
}

.extreme-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #e0e6f0;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  flex-shrink: 0;
}

.extreme-cards {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.extreme-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(15, 20, 32, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.12);
}

.extreme-card.highest {
  border-color: rgba(239, 68, 68, 0.25);
}

.extreme-card.highest .card-icon {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.extreme-card.lowest {
  border-color: rgba(34, 197, 94, 0.25);
}

.extreme-card.lowest .card-icon {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.card-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-label {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.5);
}

.card-value {
  font-size: 16px;
  font-weight: 700;
  color: #e0e6f0;
  font-family: "pmzd", monospace;
  line-height: 1.2;
}

.card-value .unit {
  font-size: 11px;
  font-weight: 400;
  color: rgba(224, 230, 240, 0.5);
  margin-left: 2px;
}

.card-desc {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.55);
}

.analysis-text {
  font-size: 12px;
  line-height: 1.7;
  color: rgba(224, 230, 240, 0.8);
  padding: 0 4px;
  overflow-y: auto;
}

.analysis-text strong {
  color: #93c5fd;
  font-weight: 700;
}

.analysis-text ul {
  margin: 6px 0 0 0;
  padding-left: 16px;
}

.analysis-text li {
  margin-bottom: 4px;
}

.analysis-text li::marker {
  color: #3b82f6;
}

.divider-line {
  height: 1px;
  background: rgba(59, 130, 246, 0.15);
  flex-shrink: 0;
}

.suggestion-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  padding-right: 4px;
}

.suggestion-item {
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(15, 20, 32, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.25s ease;
}

.suggestion-item:hover {
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(15, 20, 32, 0.6);
}

.suggestion-num {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: "pmzd", monospace;
}

.suggestion-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.suggestion-title {
  font-size: 12px;
  font-weight: 600;
  color: #e0e6f0;
}

.suggestion-desc {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.6);
  line-height: 1.5;
}
</style>
