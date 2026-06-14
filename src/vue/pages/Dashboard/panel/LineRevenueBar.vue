<template>
  <div class="charts-group">
    <div class="chart-item">
      <div class="item-title">碳排放概览</div>
      <div class="chart-content">
        <RevenueOverview :preview="props.preview" />
      </div>
    </div>
    <div class="chart-item">
      <div class="item-title">各地类碳排放所占百分比</div>
      <div class="chart-content">
        <CategoryEmissionPie :preview="props.preview" />
      </div>
    </div>
    <div class="chart-item">
      <div class="item-title">
        <span>{{ lineTitle }}</span>
        <div class="scale-switch">
          <span
            v-for="s in [1, 3, 5]"
            :key="s"
            :class="{ active: store.trendYearScale === s }"
            @click="store.setTrendYearScale(s)"
          >
            {{ s }}年
          </span>
        </div>
        <span v-if="lineSubtitle" class="subtitle">{{ lineSubtitle }}</span>
      </div>
      <div class="chart-content">
        <QuarterEmissionTrend :preview="props.preview" />
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

const props = defineProps({
  preview: { type: Boolean, default: undefined }
});

const store = useConfigStore();

const lineTitle = computed(() =>
  store.selectedCategory
    ? `${store.selectedCategory}碳排放趋势`
    : "碳排放季度变化趋势"
);
const lineSubtitle = computed(() => "");
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
  border-radius: 6px;
}

.item-title {
  font-size: 18px;
  margin-bottom: 6px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e0e6f0;
  flex-shrink: 0;
  font-weight: 700;
}

.item-title .subtitle {
  font-size: 18px;
  color: rgba(224, 230, 240, 0.4);
  font-weight: 700;
}

.scale-switch {
  display: flex;
  gap: 4px;
  margin-left: auto;
  margin-right: 8px;
}

.scale-switch span {
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: rgba(224, 230, 240, 0.5);
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.15);
  transition: all 0.2s ease;
}

.scale-switch span:hover {
  color: rgba(224, 230, 240, 0.8);
  border-color: rgba(59, 130, 246, 0.4);
}

.scale-switch span.active {
  color: #fff;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border-color: transparent;
}

.chart-content {
  flex: 1;
  min-height: 0;
}
</style>
