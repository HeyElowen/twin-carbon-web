<template>
  <div class="analysis-left">
    <!-- 头部 -->
    <div class="analysis-header">
      <div class="meta-row">
        <span class="year-badge">{{ store.year }}年 {{ store.quarter }}</span>
        <span class="analysis-name">达标分析</span>
      </div>
      <div class="legend-row">
        <div class="legend-item pass">
          <span class="dot"></span>
          <span>合格</span>
        </div>
        <div class="legend-item fail">
          <span class="dot"></span>
          <span>不合格</span>
        </div>
      </div>
    </div>

    <!-- 中间区域：判定标准 + 图表 -->
    <div class="middle-area">
      <!-- 判定标准 -->
      <div class="standard-section">
        <div class="section-title">判定标准</div>
        <div class="standard-list">
          <div
            class="standard-item"
            v-for="item in standards"
            :key="item.name"
          >
            <span class="name">{{ item.name }}</span>
            <span class="divider"></span>
            <span class="value" :class="item.status">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- 堆柱状图 -->
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

const standards = [
  { name: "学校", value: "≤0.50吨", status: "pass" },
  { name: "商业区", value: "≤1.20吨", status: "pass" },
  { name: "工业区", value: "高于均值", status: "fail" },
  { name: "住宅区", value: "≤0.80吨", status: "pass" },
  { name: "农业区", value: "≤0.35吨", status: "pass" },
];

const chartOption = computed(() => ({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "rgba(15, 20, 32, 0.9)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    textStyle: { color: "#e0e6f0" },
    formatter: (params) => {
      let html = `<div style="font-weight:600;margin-bottom:4px">${params[0].name}</div>`;
      params.forEach((p) => {
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
    data: ["合格", "不合格"],
    top: 0,
    right: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { color: "rgba(224, 230, 240, 0.7)", fontSize: 11 },
    icon: "roundRect",
  },
  grid: {
    top: 28,
    left: 10,
    right: 10,
    bottom: 20,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["学校", "商业区", "工业区", "住宅区", "农业区"],
    axisLine: { lineStyle: { color: "rgba(224, 230, 240, 0.15)" } },
    axisLabel: { color: "rgba(224, 230, 240, 0.6)", fontSize: 10, rotate: 20 },
    axisTick: { show: false },
  },
  yAxis: {
    type: "value",
    max: 100,
    name: "%",
    nameTextStyle: { color: "rgba(224, 230, 240, 0.4)", fontSize: 10, padding: [0, 0, 0, -16] },
    splitLine: { lineStyle: { color: "rgba(224, 230, 240, 0.08)" } },
    axisLine: { show: false },
    axisLabel: { color: "rgba(224, 230, 240, 0.5)", fontSize: 10, formatter: "{value}%" },
    axisTick: { show: false },
  },
  series: [
    {
      name: "合格",
      type: "bar",
      stack: "total",
      barWidth: "55%",
      emphasis: { focus: "series" },
      itemStyle: { color: "#f59e0b", borderRadius: [0, 0, 0, 0] },
      data: [92, 78, 35, 88, 95],
      label: {
        show: true,
        position: "inside",
        formatter: (p) => (p.value > 12 ? `${p.value}%` : ""),
        color: "#fff",
        fontSize: 10,
        fontWeight: 600,
        textShadowColor: "rgba(0,0,0,0.5)",
        textShadowBlur: 2,
      },
    },
    {
      name: "不合格",
      type: "bar",
      stack: "total",
      barWidth: "55%",
      emphasis: { focus: "series" },
      itemStyle: { color: "#ef4444", borderRadius: [4, 4, 0, 0] },
      data: [8, 22, 65, 12, 5],
      label: {
        show: true,
        position: "inside",
        formatter: (p) => (p.value > 12 ? `${p.value}%` : ""),
        color: "#fff",
        fontSize: 10,
        fontWeight: 600,
        textShadowColor: "rgba(0,0,0,0.5)",
        textShadowBlur: 2,
      },
    },
  ],
}));
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
  font-size: 11px;
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
  gap: 16px;
  margin-top: 4px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(224, 230, 240, 0.7);
}

.legend-item .dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.legend-item.pass .dot {
  background: #f59e0b;
}

.legend-item.fail .dot {
  background: #ef4444;
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
  font-size: 12px;
  flex-shrink: 0;
  font-weight: 600;
}

.standard-item .value.pass {
  color: #fbbf24;
}

.standard-item .value.fail {
  color: #f87171;
}

.chart-area {
  flex: 6;
  min-height: 0;
  border-radius: 6px;
  overflow: hidden;
}
</style>
