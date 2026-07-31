<template>
  <Chart :use="chartModules" :option="chartOption" :loading="loading" />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Chart from "@/vue/components/Chart.vue";
import { LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getTrend, previewTrend } from "@/api/monitoring";

const store = useConfigStore();

const props = defineProps({
  preview: { type: Boolean, default: undefined }
});

// 从后端获取的原始数据
const rawData = ref([]);
const loading = ref(true);

const categoryColors = {
  工业区: "#3b82f6",
  商业区: "#60a5fa",
  住宅区: "#8b5cf6",
  农业区: "#fbbf24",
  教育区: "#34d399",
};

// 是否使用预览统计接口 — 仅由 prop 控制，不依赖全局 store 状态
function usePreviewApi() {
  return props.preview === true;
}

// 请求趋势数据
// 1年: 只显示当前年份
// 3年: year-2 ~ year
// 5年: year-4 ~ year
async function fetchData() {
  loading.value = true;
  try {
    const category = store.selectedCategory || "";
    const yearStart = store.year - (store.trendYearScale - 1);
    let res;
    if (usePreviewApi()) {
      res = await previewTrend(store.previewBatchId, yearStart, store.year, category);
    } else {
      res = await getTrend(yearStart, store.year, category);
    }
    rawData.value = res.data || [];
  } catch {
    rawData.value = [];
  } finally {
    loading.value = false;
  }
}

// 初始化请求
fetchData();

// year / trendYearScale / selectedCategory / preview prop 变化时重新请求数据
watch([() => store.year, () => store.trendYearScale, () => store.selectedCategory, () => props.preview], fetchData);

const trendData = computed(() => {
  return rawData.value.map((item) => ({
    label: formatAxisLabel(item.name),
    value: item.value,
  }));
});

/**
 * 将 "2023-Q1" 格式化为 "23Q1"
 */
function formatAxisLabel(name) {
  if (!name || !name.includes("-")) return name;
  const [year, quarter] = name.split("-");
  const shortYear = year.slice(-2);
  return `${shortYear}${quarter}`;
}

const lineColor = computed(() => {
  return store.selectedCategory
    ? categoryColors[store.selectedCategory]
    : "#60a5fa";
});

const chartModules = [LineChart, TooltipComponent, GridComponent, LegendComponent];

const chartOption = computed(() => {
  const data = trendData.value;
  const cat = store.selectedCategory;
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      textStyle: { color: "rgba(224, 230, 240, 0.9)" },
      backgroundColor: "rgba(15, 20, 32, 0.85)",
      borderColor: lineColor.value,
      borderWidth: 1,
      borderRadius: 8,
      formatter: (params) => {
        if (!params || !params.length) return "";
        const p = params[0];
        const val = typeof p.value === "number" ? p.value.toFixed(2) : p.value;
        return `${p.name}<br/>${p.seriesName}: ${val}`;
      },
    },
    grid: { top: 30, bottom: 24, left: 16, right: 16, containLabel: true },
    legend: {
      right: 16,
      top: 0,
      data: [cat ? `${cat}碳排放` : "碳排放总量"],
      textStyle: { color: lineColor.value, fontSize: 14 },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: { lineStyle: { color: "rgba(224, 230, 240, 0.15)" } },
      axisLabel: {
        interval: 0,
        color: "rgba(224, 230, 240, 0.5)",
        fontSize: 10,
      },
      splitLine: { show: false },
      axisTick: { show: false },
      data: data.map((d) => d.label),
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "rgba(224, 230, 240, 0.5)" },
      splitLine: { show: false },
      axisLine: { show: true, lineStyle: { color: "rgba(224, 230, 240, 0.15)" } },
    },
    series: [
      {
        name: cat ? `${cat}碳排放` : "碳排放总量",
        type: "line",
        symbol: "circle",
        symbolSize: 6,
        smooth: true,
        itemStyle: { color: lineColor.value },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: lineColor.value },
              { offset: 1, color: "rgba(7, 10, 14, 0.1)" },
            ],
            global: false,
          },
        },
        data: data.map((d) => d.value),
      },
    ],
    animationDuration: 400,
    animationDurationUpdate: 400,
  };
});
</script>
