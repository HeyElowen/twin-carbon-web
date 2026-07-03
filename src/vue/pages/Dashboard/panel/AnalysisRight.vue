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
            <div class="card-value">{{ extremeInfo.max.value.toFixed(2) }} <span class="unit">吨</span></div>
            <div class="card-desc">{{ extremeInfo.max.category }} · {{ extremeInfo.max.name }}</div>
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
            <div class="card-value">{{ extremeInfo.min.value.toFixed(2) }} <span class="unit">吨</span></div>
            <div class="card-desc">{{ extremeInfo.min.category }} · {{ extremeInfo.min.name }}</div>
          </div>
        </div>
      </div>

      <!-- 严重异常建筑列表 -->
      <div class="severe-list" v-if="severeBuildings.length">
        <div class="severe-title">严重异常</div>
        <div
          class="severe-item"
          v-for="b in severeBuildings"
          :key="b.name"
          :title="b.anomalyLevel === 'severe_high' ? '严重超标' : '严重偏低'"
        >
          <span
            class="severe-symbol"
            :class="b.anomalyLevel === 'severe_high' ? 'high' : 'low'"
          >{{ b.anomalyLevel === 'severe_high' ? '▲' : '▼' }}</span>
          <span class="severe-name">{{ b.name }}</span>
          <span class="severe-cat">{{ b.category }}</span>
          <span class="severe-val">{{ (b.emission ?? 0).toFixed(2) }}吨</span>
        </div>
      </div>

      <div class="analysis-text" v-if="rawFeatures.length">
        <p v-for="(p, i) in analysisText.paragraphs" :key="i">{{ p }}</p>
        <p>结合当前时间段经济活动及政策事件分析，极值出现原因推测为：</p>
        <ul>
          <li v-for="(r, i) in analysisText.reasons" :key="i">{{ r }}</li>
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

    <!-- 无数据时占位 -->
    <div v-if="!rawFeatures.length" class="empty-mask">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getExtremeAnalysis } from "@/api/monitoring";
const store = useConfigStore();

// ─── 极值分析接口数据 ────────────────────────────
const extremeData = ref({ outliers: [], globalStats: {}, categoryStats: {} });
const extremeLoading = ref(false);

async function fetchExtremeAnalysis() {
  extremeLoading.value = true;
  try {
    const res = await getExtremeAnalysis(store.year, store.quarter);
    const data = res.data || { outliers: [], globalStats: {}, categoryStats: {} };
    extremeData.value = data;
    store.extremeAnalysisData = data; // 共享给其他组件
  } catch (e) {
    console.warn("[AnalysisRight] 极值分析接口异常:", e);
  } finally {
    extremeLoading.value = false;
  }
}

// 年/季度变化时重新请求
watch(() => [store.year, store.quarter], fetchExtremeAnalysis, { immediate: true });

// ─── 严重异常建筑（severe_high / severe_low）────
const severeBuildings = computed(() => {
  return (extremeData.value.outliers || []).filter(
    o => o.anomalyLevel === 'severe_high' || o.anomalyLevel === 'severe_low'
  );
});

// ─── 数据来源：从 store 共享（dashboard.vue 负责请求）─
const rawFeatures = computed(() => store.buildingPointFeatures);

// ─── 极值计算 ──────────────────────────────────────
const extremeInfo = computed(() => {
  const features = rawFeatures.value;
  if (!features.length) {
    return {
      max: { value: 0, name: "--", category: "--" },
      min: { value: 0, name: "--", category: "--" },
      extremeCount: 0,
      totalCount: 0,
    };
  }

  let maxFeature = features[0];
  let minFeature = features[0];

  features.forEach((f) => {
    const e = f.properties?.emission ?? 0;
    if (e > (maxFeature.properties?.emission ?? 0)) maxFeature = f;
    if (e < (minFeature.properties?.emission ?? 0)) minFeature = f;
  });

  const maxVal = maxFeature.properties?.emission ?? 0;
  const threshold = maxVal * 0.7;
  const extremeCount = features.filter((f) => (f.properties?.emission ?? 0) >= threshold).length;

  return {
    max: {
      value: maxVal,
      name: maxFeature.properties?.name ?? "--",
      category: maxFeature.properties?.category ?? "--",
    },
    min: {
      value: minFeature.properties?.emission ?? 0,
      name: minFeature.properties?.name ?? "--",
      category: minFeature.properties?.category ?? "--",
    },
    extremeCount,
    totalCount: features.length,
  };
});

// ─── AI 分析文本 ──────────────────────────────────
const analysisText = computed(() => {
  const info = extremeInfo.value;
  const { year, quarter } = store;
  if (!info.totalCount) return { paragraphs: [], reasons: [] };

  const qName = { Q1: "第一", Q2: "第二", Q3: "第三", Q4: "第四", ALL: "全年" }[quarter] || quarter;
  const extremeRatio = Math.round((info.extremeCount / info.totalCount) * 100);

  const paragraphs = [
    `${year}年${qName}季度共监测 ${info.totalCount} 个排放源，其中极值（≥峰值70%）出现 ${info.extremeCount} 次，占比 ${extremeRatio}%。`,
  ];

  if (info.max.category !== "--") {
    paragraphs.push(`最高排放点为「${info.max.name}」（${info.max.category}），排放量 ${info.max.value.toFixed(2)} 吨，远超同类平均水平。`);
  }
  if (info.min.category !== "--") {
    paragraphs.push(`最低排放点为「${info.min.name}」（${info.min.category}），排放量 ${info.min.value.toFixed(2)} 吨，减排措施成效显著。`);
  }

  // ── 原因推测 ──
  const reasons = [];

  const qReasons = {
    Q1: ["春节后工业复工复产，用电负荷阶段性冲高", "采暖季末期部分区域仍维持高能耗运行"],
    Q2: ["季度初工业生产全面复苏，用电负荷激增", "春耕期间农业机械用油量增加"],
    Q3: ["夏季高温导致空调制冷能耗大幅上升", "工业生产进入高峰期，产能利用率达到年度峰值"],
    Q4: ["冬季采暖需求增加，燃煤燃气消耗上升", "年底冲刺生产目标，工业产能超负荷运转"],
    ALL: ["年度经济活动周期性波动影响排放水平"],
  };
  reasons.push(...(qReasons[quarter] || qReasons.ALL));

  if (info.max.category === "工业区") {
    reasons.push("工业区产能密集，高耗能设备集中，是区域碳排放的主要来源");
  } else if (info.max.category === "商业区") {
    reasons.push("商业区大型中央空调及照明系统全天候运行，建筑能耗居高不下");
  } else if (info.max.category === "住宅区") {
    reasons.push("住宅区人口密度高，生活用能需求集中，呈现聚集性排放特征");
  }

  if (extremeRatio > 50) {
    reasons.push("超过半数排放源处于高排放区间，可能存在系统性减排瓶颈");
  } else if (info.extremeCount <= 3) {
    reasons.push("极值点较为分散，建议对个别高排放源进行精准排查与整治");
  }

  if (year >= 2025) {
    reasons.push("2025年碳达峰目标临近，重点行业面临更严格的排放约束与考核压力");
  }

  return { paragraphs, reasons };
});

// ─── 针对性建议 ──────────────────────────────────
const suggestions = computed(() => {
  const info = extremeInfo.value;
  const { year, quarter } = store;
  if (!info.totalCount) return [];

  const reductionTarget = info.max.category === "工业区" ? 25 : info.max.category === "商业区" ? 20 : 15;
  const warnThreshold = Math.round(info.max.value * 0.8 * 10) / 10;

  return [
    {
      title: `${info.max.category === "--" ? "重点区域" : info.max.category}减排专项整治`,
      desc: `对「${info.max.name}」等高排放源实施重点排查，推进清洁能源替代与节能改造，目标降低排放 ${reductionTarget}% 以上。`,
    },
    {
      title: "建立极值预警与响应机制",
      desc: `将 ${info.max.value.toFixed(0)} 吨 · ${info.max.category} 设为红色预警线，${warnThreshold} 吨设为橙色预警阈值，超限自动触发排查。当前极值占比 ${Math.round((info.extremeCount / info.totalCount) * 100)}%，需密切监控排放异常波动。`,
    },
    {
      title: "推动低碳技术升级与政策对接",
      desc: year >= 2025
        ? `面向${year}年碳达峰关键节点，推广光伏建筑一体化、智慧能源管理平台等技术手段。${quarter === "ALL" ? "全年" : quarter.replace("Q", "第") + "季度"}极值数据可为碳配额分配提供决策依据。`
        : "提前布局碳减排技术路线，争取专项资金支持，实施重点领域能效提升工程。",
    },
  ];
});
</script>

<style scoped>
.analysis-right {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  overflow: hidden;
  position: relative;
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
  min-width: 0;
}

.card-label {
  font-size: 13px;
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
  font-size: 13px;
  font-weight: 400;
  color: rgba(224, 230, 240, 0.5);
  margin-left: 2px;
}

.card-desc {
  font-size: 13px;
  color: rgba(224, 230, 240, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.analysis-text {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(224, 230, 240, 0.8);
  padding: 0 4px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
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
  font-size: 13px;
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
  font-size: 14px;
  font-weight: 600;
  color: #e0e6f0;
}

.suggestion-desc {
  font-size: 13px;
  color: rgba(224, 230, 240, 0.6);
  line-height: 1.5;
}

.empty-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(224, 230, 240, 0.3);
  font-size: 14px;
  pointer-events: none;
}

/* ── 严重异常列表 ── */
.severe-list {
  flex-shrink: 0;
  background: rgba(15, 20, 32, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.12);
  border-radius: 6px;
  padding: 8px 10px;
  max-height: 140px;
  overflow-y: auto;
}

.severe-title {
  font-size: 13px;
  font-weight: 600;
  color: #e0e6f0;
  margin-bottom: 6px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
}

.severe-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: rgba(224, 230, 240, 0.85);
  cursor: default;
  transition: background 0.2s;
}

.severe-item:hover {
  background: rgba(59, 130, 246, 0.1);
}

.severe-symbol {
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  line-height: 1;
}

.severe-symbol.high { color: #ef4444; }
.severe-symbol.low  { color: #22c55e; }

.severe-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  font-weight: 500;
}

.severe-cat {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.4);
  flex-shrink: 0;
}

.severe-val {
  font-family: "pmzd", monospace;
  font-size: 12px;
  color: rgba(224, 230, 240, 0.5);
  flex-shrink: 0;
}
</style>
