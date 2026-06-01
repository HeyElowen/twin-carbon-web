<template>
  <Chart :use="chartModules" :option="chartOption" />
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Chart from "@/vue/components/Chart.vue";
import { BarChart, PictorialBarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { LabelLayout } from "echarts/features";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getCategoryIntensity } from "@/api/monitoring";

const store = useConfigStore();
const rawData = ref([]);

async function fetchData() {
  try {
    const res = await getCategoryIntensity(store.year, store.quarter);
    rawData.value = res.data || [];
  } catch {
    rawData.value = [];
  }
  if (store.tracebackPlaying) store.tracebackTick();
}

fetchData();
watch([() => store.year, () => store.quarter], fetchData);

const categoryColors = {
  工业区: "#ef4444",
  商业区: "#f59e0b",
  住宅区: "#3b82f6",
  教育区: "#a855f7",
  农业区: "#22c55e",
};

const chartData = computed(() => {
  const order = ["工业区", "商业区", "教育区", "住宅区", "农业区"];
  const list = order.map((name) => {
    const item = rawData.value.find((d) => d.name === name);
    return item || { name, value: 0 };
  });
  // 按排放强度从高到低排序（工业区通常在顶部）
  return list.sort((a, b) => b.value - a.value);
});

const chartModules = [BarChart, PictorialBarChart, GridComponent, TooltipComponent, LabelLayout];

const chartOption = computed(() => {
  const data = chartData.value;
  return {
    grid: { top: 4, bottom: 4, left: "10%", right: "18%" },
    xAxis: { show: false },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 13,
        margin: 10,
        color: "#e0e6f0",
      },
      data: data.map((item) => item.name),
      type: "category",
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      textStyle: { color: "rgba(224, 230, 240, 0.9)" },
      backgroundColor: "rgba(15, 20, 32, 0.85)",
      borderColor: "#3b82f6",
      borderWidth: 1,
      borderRadius: 8,
      formatter: (params) => {
        if (!params || !params.length) return "";
        const p = params[0];
        const val = typeof p.value === "number" ? p.value.toFixed(2) : p.value;
        return `${p.name}<br/>排放强度: ${val} kg/m²`;
      },
    },
    series: [
      {
        type: "bar",
        data: data.map((item) => ({
          value: item.value,
          itemStyle: {
            borderRadius: 4,
            color: categoryColors[item.name] || "#3b82f6",
          },
        })),
        barWidth: 10,
        showBackground: true,
        backgroundStyle: { borderRadius: 4, color: "rgba(156, 163, 175, 0.08)" },
        label: {
          show: true,
          color: "rgba(224, 230, 240, 0.85)",
          valueAnimation: true,
          fontSize: 12,
          fontWeight: "bold",
          formatter: (p) => `${p.value.toFixed(2)} kg/m²`,
        },
        labelLayout: (params) => ({
          x: "100%",
          y: params.rect.y + params.rect.height / 2,
          verticalAlign: "middle",
          align: "right",
        }),
      },
      {
        name: "dot",
        type: "pictorialBar",
        symbol: "circle",
        symbolSize: 14,
        z: 12,
        itemStyle: {
          color: (p) => categoryColors[p.name] || "#3b82f6",
          shadowColor: (p) => categoryColors[p.name] || "#3b82f6",
          shadowBlur: 10,
        },
        data: data.map((item) => ({ value: item.value, symbolPosition: "end" })),
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
});
</script>
