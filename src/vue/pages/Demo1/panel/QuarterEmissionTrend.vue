<template>
  <Chart :use="chartModules" :option="chartOption" />
</template>

<script setup>
import { computed } from "vue";
import Chart from "@/vue/components/Chart.vue";
import { LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { mockTrendData } from "@/api/mock-data";

const store = useConfigStore();

const categoryColors = {
  工业区: "#3b82f6",
  商业区: "#60a5fa",
  住宅区: "#8b5cf6",
  农业区: "#fbbf24",
  教育区: "#34d399",
};

function resolveYear(targetYear) {
  if (mockTrendData["all"]?.[targetYear]) return targetYear;
  const available = Object.keys(mockTrendData["all"] || {})
    .map(Number)
    .sort((a, b) => b - a);
  return available[0] || 2025;
}

const trendData = computed(() => {
  const y = resolveYear(store.year);
  const cat = store.selectedCategory || "all";
  const raw = mockTrendData[cat]?.[y] || mockTrendData["all"]?.[y] || [];
  return raw.map((item) => ({
    quarter: item.name.split("-")[1],
    value: item.value,
  }));
});

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
    },
    grid: { top: 30, bottom: 24, left: 16, right: 16, containLabel: true },
    legend: {
      right: 16,
      top: 0,
      data: [cat ? `${cat}碳排放` : "碳排放总量"],
      textStyle: { color: lineColor.value },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: { lineStyle: { color: "rgba(224, 230, 240, 0.15)" } },
      axisLabel: { interval: 0, color: "rgba(224, 230, 240, 0.5)" },
      splitLine: { show: false },
      axisTick: { show: false },
      data: data.map((d) => d.quarter),
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
