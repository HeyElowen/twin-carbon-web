<template>
  <div class="charts-group">
    <div class="chart-item">
      <div class="item-title">各类用地排放强度</div>
      <div class="chart-content">
        <CityPopulationRank />
      </div>
    </div>
    <div class="chart-item">
      <div class="item-title">区域显示控制</div>
      <div class="district-content">

        <el-checkbox
          v-for="name in districtNames"
          :key="name"
          v-model="store.districts[name]"
          :label="name"
        
          class="district-check"
        >
          <span class="district-label">{{ name }}</span>
        </el-checkbox>
      </div>
    </div>
    <div class="chart-item heatmap-item">
      <div class="item-title">3D 碳排放热力图</div>
      <div class="heatmap-panel-wrapper">
        <HeatmapPanel :modelValue="store.heatmapConfig" @update:modelValue="onHeatmapUpdate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from "@/js/stores/useConfigStore";
import CityPopulationRank from "./CityPopulationRank.vue";
import HeatmapPanel from "@/vue/pages/Demo1/components/HeatmapPanel.vue";

const store = useConfigStore();
const districtNames = ["农业区", "工业区", "住宅区", "商业区", "教育区"];

function onHeatmapUpdate(val) {
  store.updateHeatmapConfig(val);
}
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

.chart-item.empty {
  background: transparent;
}

.chart-item.heatmap-item {
  flex: 1.6;
}

.heatmap-panel-wrapper {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 2px 4px;
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

.district-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 8px 12px;
}

.district-check {
  height: 40px;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.district-check :deep(.el-checkbox__inner) {
  width: 18px;
  height: 18px;
  background: rgba(15, 20, 32, 0.8);
  border-color: rgba(96, 165, 250, 0.5);
  border-radius: 4px;
}

.district-check :deep(.el-checkbox__inner::after) {
  
  width: 4px;
  height: 9px;
}

.district-check :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #3b82f6;
  border-color: #3b82f6;
}

.district-check :deep(.el-checkbox__label) {
  padding-left: 14px;
  font-size: 14px;
  color: rgba(224, 230, 240, 0.7);
}

.district-check :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #e0e6f0;
}

.district-label {
  letter-spacing: 2px;
}
</style>
