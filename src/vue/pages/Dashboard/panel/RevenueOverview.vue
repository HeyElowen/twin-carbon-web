<template>
  <div class="chart4-wrapper">
    <div class="trend-chart">
      <Chart :use="chartModules" :option="chartOption" />
    </div>
    <div class="statistics">
      <div class="statistics-title">碳排放总量</div>
      <NumberAnimation
        :value="overview.totalEmission"
        :options="{ minimumFractionDigits: 2, maximumFractionDigits: 2 }"
        class="statistics-number"
      />
    </div>
    <div class="statistics-item wide">
      <svg class="item-icon" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#3b82f6">
        <path d="M597.479619 154.063238V852.358095h52.150857V320.658286l169.252572 58.88a56.32 56.32 0 0 1 25.795047 42.959238l0.170667 4.388571V852.358095H902.095238V926.47619H121.904762v-74.093714h56.953905v-566.613333c0-19.456 10.166857-37.546667 26.843428-47.85981l304.444953-131.705904c38.034286-23.503238 87.332571 3.510857 87.332571 47.859809zM471.771429 482.816l-167.107048 68.266667v80.115809l167.107048-68.242286v-80.14019z m0-175.225905L304.664381 377.904762v80.530286l167.107048-70.339048v-80.457143z" />
      </svg>
      监测建筑数
      <NumberAnimation :value="overview.buildingCount" :options="{ maximumFractionDigits: 0 }" class="statistics-item-number" />
    </div>
    <div class="statistics-item wide">
      <svg class="item-icon" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#3b82f6">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
        <path d="M686.7 638.6L544.1 535.5V288c0-17.7-14.3-32-32-32h-32c-17.7 0-32 14.3-32 32v275.3c0 9.5 4.2 18.5 11.5 24.6l162.4 120.6c14.3 10.6 34.5 7.7 45.1-6.6l16.3-22c10.6-14.3 7.7-34.5-6.6-45.1z" />
      </svg>
      平均排放强度
      
      <span
        class="yoy-badge"
        :style="{ background: yoyColor }"
      >
        {{ yoyText }}
      </span>
      <span class="statistics-item-number">{{ overview.avgIntensity?.toFixed?.(2) ?? overview.avgIntensity }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Chart from "@/vue/components/Chart.vue";
import NumberAnimation from "@/vue/components/NumberAnimation.vue";
import { LineChart } from "echarts/charts";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { getOverview } from "@/api/monitoring";

const store = useConfigStore();

const overview = ref({
  totalEmission: 0,
  buildingCount: 0,
  avgIntensity: 0,
  yoyChange: 0,
  trend: [],
});

async function fetchData() {
  try {
    const res = await getOverview(store.year, store.quarter);
    if (res.data) {
      const d = res.data;
      // 兼容后端返回的下划线/驼峰两种 key 格式
      overview.value = {
        totalEmission: d.totalEmission ?? d.total_emission ?? 0,
        buildingCount: d.buildingCount ?? d.building_count ?? 0,
        avgIntensity: d.avgIntensity ?? d.avg_intensity ?? 0,
        yoyChange: d.yoyChange ?? d.yoy_change ?? 0,
        trend: d.trend ?? [],
      };
    }
  } catch {
    overview.value = { totalEmission: 0, buildingCount: 0, avgIntensity: 0, yoyChange: 0, trend: [] };
  }
  // 回溯模式下通知进度管理器
  if (store.tracebackPlaying) store.tracebackTick();
}

fetchData();
watch([() => store.year, () => store.quarter], fetchData);

const yoyText = computed(() => {
  const v = overview.value.yoyChange;
  if (v === 0) return "0%";
  return v > 0 ? `+${v}%` : `${v}%`;
});

const yoyColor = computed(() => {
  const v = overview.value.yoyChange;
  // 排放下降（负增长）= 好事 = 绿色；排放上升 = 坏事 = 红色
  if (v < 0) return "rgba(52, 211, 153, 0.2)";
  if (v > 0) return "rgba(239, 68, 68, 0.2)";
  return "rgba(148, 163, 184, 0.2)";
});

const chartModules = [LineChart];

const chartOption = computed(() => {
  const data = overview.value.trend || [];
  const values = data.map((d) => d.value);
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      textStyle: { color: "rgba(224, 230, 240, 0.9)" },
      backgroundColor: "rgba(15, 20, 32, 0.85)",
      borderColor: "#3b82f6",
      borderWidth: 1,
      borderRadius: 8,
      formatter: (params) => {
        if (!params || !params.length) return "";
        const p = params[0];
        const val = typeof p.value === "number" ? p.value.toFixed(2) : p.value;
        return `${p.name}<br/>排放量: ${val} t`;
      },
    },
    grid: { top: 8, bottom: 8, left: 8, right: 8 },
    xAxis: {
      show: false,
      type: "category",
      data: data.map((d) => d.name),
      boundaryGap: false,
    },
    yAxis: { show: false, type: "value" },
    series: {
      type: "line",
      symbol: "none",
      smooth: true,
      lineStyle: { color: "#3b82f6", width: 2 },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(59, 130, 246, 0.5)" },
            { offset: 1, color: "rgba(7, 10, 14, 0.05)" },
          ],
          global: false,
        },
      },
      data: values,
    },
  };
});
</script>

<style scoped>
.chart4-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 2fr repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.trend-chart {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  min-height: 0;
}

.statistics {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 0;
  border-radius: 6px;
}

.statistics-title {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.6);
}

.statistics-number {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 26px;
  font-weight: 700;
  color: #3b82f6;
  word-break: break-all;
  line-height: 1.1;
}

.statistics-number::after {
  content: "t";
  display: inline-block;
  font-size: 12px;
  color: rgba(224, 230, 240, 0.5);
  font-weight: normal;
}

.statistics-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: rgba(224, 230, 240, 0.7);
  min-height: 0;
  border-radius: 6px;
  background: rgba(15, 20, 32, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.1);
  padding: 0 10px;
}

.statistics-item.wide {
  grid-column: 1 / 3;
}

.item-icon {
  flex-shrink: 0;
}

.statistics-item-number {
  font-size: 24px;
  font-weight: 600;
  margin-left: auto;
  color: #e0e6f0;
}

.yoy-badge {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
  color: #e0e6f0;
  font-weight: 500;
}
</style>
