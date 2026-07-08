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
            :class="{ active: store.selectedAnalysisDistrict === item.name }"
            @click="store.setSelectedAnalysisDistrict(item.name)"
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
import { ref, computed, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import Chart from "@/vue/components/Chart.vue";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { getLayeredColoring } from "@/api/analysis";

const store = useConfigStore();
const modules = [BarChart, GridComponent, TooltipComponent, LegendComponent];

// ─── 区域名称（与 API 返回的 category 字段一致）──
const districtNames = ["教育区", "商业区", "工业区", "住宅区", "农业区"];

// ─── 分层设色数据（API — /analysis/layered-coloring）───
const layeredData = ref(null);

watch([() => store.year, () => store.quarter], async () => {
  try {
    const res = await getLayeredColoring(store.year, store.quarter);
    layeredData.value = res.data;
  } catch (e) {
    console.error("获取分层设色数据失败", e);
    layeredData.value = null;
  }
}, { immediate: true });

// ─── 等级定义（与 API 返回的 level 1-5 对应）─────
const gradeMeta = [
  { grade: "1", label: "优秀", color: "#22c55e" },
  { grade: "2", label: "良好", color: "#84cc16" },
  { grade: "3", label: "达标", color: "#f59e0b" },
  { grade: "4", label: "较差", color: "#f97316" },
  { grade: "5", label: "超标", color: "#ef4444" },
];

// ─── 判定标准（从 API 分层设色阈值读取实际数值）─────
const staticStandards = computed(() => {
  const th = layeredData.value?.thresholds ?? {};
  return districtNames.map((name) => {
    const t = th[name];
    if (t && t.min != null && t.max != null) {
      const minStr = Number(t.min).toFixed(1);
      const maxStr = Number(t.max).toFixed(1);
      return { name, value: `${minStr} ~ ${maxStr} kg/m²` };
    }
    return { name, value: "—" };
  });
});

// ─── 图表 — 各等级占比 ───────────────────────────
const chartOption = computed(() => {
  const buildings = layeredData.value?.buildings ?? [];

  // 过滤掉无建筑数据的区域
  const nonEmptyDistricts = districtNames.filter((name) => {
    return buildings.some((b) => b.category === name);
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
        const districtBuildings = buildings.filter((b) => b.category === name);
        const total = districtBuildings.length;
        if (total === 0) return 0;
        const level = parseInt(g.grade);
        const count = districtBuildings.filter((b) => b.level === level).length;
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

  // 顶部 border-radius 只给最顶层
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

.standard-item.active {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.35);
  outline: 1px solid rgba(59, 130, 246, 0.2);
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
  font-weight: 400;
  color: rgba(224, 230, 240, 0.7);
  margin-right: 6px;
}

.chart-area {
  flex: 6;
  min-height: 0;
  border-radius: 6px;
  overflow: hidden;
}
</style>
