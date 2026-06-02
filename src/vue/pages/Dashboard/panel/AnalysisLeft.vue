<template>
  <div class="analysis-left">
    <!-- 头部 -->
    <div class="analysis-header">
      <div class="meta-row">
        <span class="year-badge">{{ store.year }}年 {{ store.quarter }}</span>
        <span class="analysis-name">达标分析</span>
      </div>
      <div class="legend-row">
        <div
          class="legend-item"
          v-for="g in gradeMeta"
          :key="g.grade"
        >
          <span class="dot" :style="{ background: g.color }"></span>
          <span>{{ g.label }}</span>
        </div>
      </div>
    </div>

    <!-- 中间区域：判定标准 + 图表 -->
    <div class="middle-area">
      <!-- 判定标准（静态基值，不随筛选变化） -->
      <div class="standard-section">
        <div class="section-title">判定标准</div>
        <div class="standard-list">
          <div
            class="standard-item"
            v-for="item in staticStandards"
            :key="item.name"
          >
            <span class="name">{{ item.name }}</span>
            <span class="divider"></span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- 堆柱状图（各等级占比） -->
      <div class="chart-area">
        <Chart :use="modules" :option="chartOption" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import Chart from "@/vue/components/Chart.vue";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
const store = useConfigStore();
const modules = [BarChart, GridComponent, TooltipComponent, LegendComponent];

const districtNames = ["学校", "商业区", "工业区", "住宅区", "农业区"];
const nameToCategory = {
  "学校": "教育区", "商业区": "商业区", "工业区": "工业区",
  "住宅区": "住宅区", "农业区": "农业区",
};

// ─── 静态基值（判定标准不随筛选变化）─────────────
const baseThresholds = {
  "学校": 0.50,
  "商业区": 1.20,
  "工业区": 1.80,
  "住宅区": 0.80,
  "农业区": 0.35,
};

// ─── 等级定义 ────────────────────────────────────
const gradeMeta = [
  { grade: "A", label: "优秀 (≤80%)",  color: "#22c55e", lower: 0,     upper: 0.8 },
  { grade: "B", label: "良好 (≤90%)",  color: "#84cc16", lower: 0.8,   upper: 0.9 },
  { grade: "C", label: "达标 (≤100%)", color: "#f59e0b", lower: 0.9,   upper: 1.0 },
  { grade: "D", label: "较差 (≤120%)", color: "#f97316", lower: 1.0,   upper: 1.2 },
  { grade: "E", label: "超标 (>120%)", color: "#ef4444", lower: 1.2,   upper: Infinity },
];

function getGrade(emission, threshold) {
  const ratio = emission / threshold;
  for (const g of gradeMeta) {
    if (ratio >= g.lower && ratio <= g.upper) return g.grade;
  }
  return "E";
}

// ─── 数据来源：从 store 共享（dashboard.vue 负责请求）─
const rawFeatures = computed(() => store.buildingPointFeatures);

// ─── 静态判定标准（使用基值，不随 year/quarter 变化）─
const staticStandards = computed(() => {
  const features = rawFeatures.value;
  return districtNames.map((name) => {
    const threshold = baseThresholds[name];
    const category = nameToCategory[name];
    const districtBuildings = features.filter((f) => f.properties?.category === category);
    const total = districtBuildings.length;

    return { name, value: `≤${threshold.toFixed(2)}吨` };
  });
});

// ─── 图表 — 各等级占比 ───────────────────────────
const chartOption = computed(() => {
  const features = rawFeatures.value;

  // 过滤掉无建筑数据的区域
  const nonEmptyDistricts = districtNames.filter((name) => {
    return features.some((f) => f.properties?.category === nameToCategory[name]);
  });

  // 为每个 district 计算 5 个等级的计数
  const seriesData = gradeMeta.map((g) => {
    return {
      name: g.label,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      emphasis: { focus: "series" },
      itemStyle: { color: g.color, borderRadius: 0 },
      data: nonEmptyDistricts.map((name) => {
        const threshold = baseThresholds[name];
        const category = nameToCategory[name];
        const districtBuildings = features.filter((f) => f.properties?.category === category);
        const total = districtBuildings.length;
        if (total === 0) return 0;
        const count = districtBuildings.filter((f) => {
          const e = f.properties?.emission ?? 0;
          const ratio = e / threshold;
          return ratio >= g.lower && ratio <= g.upper;
        }).length;
        return Math.round((count / total) * 100);
      }),
      label: {
        show: true,
        position: "inside",
        formatter: (p) => (p.value > 8 ? `${p.value}%` : ""),
        color: "#fff",
        fontSize: 11,
        fontWeight: 600,
        textShadowColor: "rgba(0,0,0,0.5)",
        textShadowBlur: 2,
      },
    };
  });

  // 顶部的 border-radius 只给最顶层（非零值的最高层）
  // ECharts 无法原生跨 series 感知，这里用简单方案：
  // 最顶层加 borderRadius，但因为是 stack 所以需要手动调整
  // 简化：对所有 series 顶部加小圆角
  seriesData.forEach((s, i) => {
    if (i === seriesData.length - 1) {
      s.itemStyle.borderRadius = [4, 4, 0, 0];
    }
  });

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(15, 20, 32, 0.9)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      textStyle: { color: "#e0e6f0" },
      formatter: (params) => {
        let html = `<div style="font-weight:600;margin-bottom:4px">${params[0].name}</div>`;
        params.forEach((p) => {
          if (p.value === 0) return;
          html += `<div style="display:flex;align-items:center;gap:6px;margin-top:2px">
            <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${p.color}"></span>
            <span>${p.seriesName}：</span>
            <span style="font-weight:700;font-family:pmzd,monospace">${p.value}%</span>
          </div>`;
        });
        return html;
      },
    },
    legend: {
      data: gradeMeta.map((g) => g.label),
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: "rgba(224, 230, 240, 0.7)", fontSize: 11 },
      icon: "roundRect",
    },
    grid: {
      top: 36,
      left: 10,
      right: 10,
      bottom: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: nonEmptyDistricts,
      axisLine: { lineStyle: { color: "rgba(224, 230, 240, 0.15)" } },
      axisLabel: { color: "rgba(224, 230, 240, 0.6)", fontSize: 12, rotate: 20 },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      max: 100,
      name: "%",
      nameTextStyle: { color: "rgba(224, 230, 240, 0.4)", fontSize: 12, padding: [0, 0, 0, -16] },
      splitLine: { lineStyle: { color: "rgba(224, 230, 240, 0.08)" } },
      axisLine: { show: false },
      axisLabel: { color: "rgba(224, 230, 240, 0.5)", fontSize: 12, formatter: "{value}%" },
      axisTick: { show: false },
    },
    series: seriesData,
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
});
</script>

<style scoped>
.analysis-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 6px;
}

.analysis-header {
  flex-shrink: 0;
}

.middle-area {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.year-badge {
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.analysis-name {
  font-size: 15px;
  font-weight: 600;
  color: #e0e6f0;
}

.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin-top: 4px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgba(224, 230, 240, 0.7);
}

.legend-item .dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.standard-section {
  flex: 4;
  min-height: 0;
  background: rgba(15, 20, 32, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #e0e6f0;
  margin-bottom: 6px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  flex-shrink: 0;
}

.standard-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 2px;
  overflow-y: auto;
}

.standard-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgba(224, 230, 240, 0.9);
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(30, 41, 59, 0.3);
  transition: all 0.2s ease;
}

.standard-item:hover {
  background: rgba(59, 130, 246, 0.1);
}

.standard-item .name {
  min-width: 52px;
  flex-shrink: 0;
  font-weight: 500;
}

.standard-item .divider {
  flex: 1;
  height: 1px;
  background: rgba(224, 230, 240, 0.08);
  margin: 0 10px;
}

.standard-item .value {
  font-family: "pmzd", monospace;
  font-size: 13px;
  flex-shrink: 0;
  font-weight: 600;
  color: rgba(224, 230, 240, 0.7);
  margin-right: 6px;
}

.grade-badge {
  font-size: 13px;
  font-weight: 700;
  font-family: "pmzd", monospace;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chart-area {
  flex: 6;
  min-height: 0;
  border-radius: 6px;
  overflow: hidden;
}
</style>
