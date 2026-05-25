<template>
  <Chart :use="chartModules" :option="chartOption" />
</template>

<script setup>
import Chart from "@/vue/components/Chart.vue";
import { BarChart, PictorialBarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { LabelLayout } from "echarts/features";
import cityData from "@/js/data/cityData";

const colors = ["#60a5fa", "#3b82f6"];
const citys = Object.keys(cityData);

const data = Array.from({ length: 5 }, (_, k) => ({
  name: citys[k],
  value: cityData[citys[k]].population,
}));

const chartModules = [BarChart, PictorialBarChart, GridComponent, TooltipComponent, LabelLayout];

const chartOption = {
  grid: { top: 0, bottom: 0, left: "8%", right: "12%" },
  xAxis: { show: false },
  yAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 14,
      margin: 16,
      inside: false,
      verticalAlign: "middle",
      color: "#e0e6f0",
      formatter: (v, i) => `{a|NO.${i + 1}} ${v}`,
      rich: { a: { color: "rgba(224, 230, 240, 0.5)" } },
    },
    data: data.map((item) => item.name),
    type: "category",
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      type: "bar",
      data: data.map((item) => item.value),
      realtimeSort: true,
      barWidth: 8,
      itemStyle: {
        borderRadius: 4,
        color: {
          type: "linear",
          x: 1, y: 0, x2: 0, y2: 0,
          colorStops: colors.map((color, index) => ({ offset: index, color })),
          global: false,
        },
      },
      showBackground: true,
      backgroundStyle: { borderRadius: 4, color: "rgba(156, 163, 175, 0.08)" },
      label: { show: true, color: "rgba(224, 230, 240, 0.85)", valueAnimation: true, fontSize: 16, fontWeight: "bold" },
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
      symbolSize: 16,
      z: 12,
      itemStyle: { color: "#3b82f6", shadowColor: "#3b82f6", shadowBlur: 10 },
      data: data.map((item) => ({ value: item.value, symbolPosition: "end" })),
    },
  ],
  animationDuration: 0,
  animationDurationUpdate: 1000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};
</script>
