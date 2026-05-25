<template>
  <div class="charts-group">
    <div class="chart-item">
      <div class="item-title">企业收益总数统计<span>REVENUE STATISTICS</span></div>
      <div class="chart-content">
        <RevenueOverview />
      </div>
    </div>
    <div class="chart-item">
      <div class="item-title">各地类碳排放所占百分比<span>CATEGORY EMISSION RATIO</span></div>
      <div class="chart-content">
        <CategoryEmissionPie />
      </div>
    </div>
    <div class="chart-item">
      <div class="item-title">{{ lineTitle }}<span>{{ lineSubtitle }}</span></div>
      <div class="chart-content">
        <QuarterEmissionTrend />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import RevenueOverview from "./RevenueOverview.vue";
import CategoryEmissionPie from "./CategoryEmissionPie.vue";
import QuarterEmissionTrend from "./QuarterEmissionTrend.vue";

const store = useConfigStore();

const lineTitle = computed(() =>
  store.selectedCategory
    ? `${store.selectedCategory}碳排放趋势`
    : "碳排放季度变化趋势"
);
const lineSubtitle = computed(() =>
  store.selectedCategory ? "CATEGORY TREND" : "QUARTERLY EMISSION TREND"
);
</script>

<style scoped>
.charts-group {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
}

.chart-item {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 14px;
  margin-bottom: 6px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e0e6f0;
  flex-shrink: 0;
}

.item-title span {
  font-size: 9px;
  color: rgba(224, 230, 240, 0.4);
  font-weight: normal;
}

.chart-content {
  flex: 1;
  min-height: 0;
}
</style>
