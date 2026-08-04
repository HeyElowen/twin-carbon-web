<template>
  <div class="charts-group">
    <div class="chart-item">
      <div class="item-title">各类用地排放强度</div>
      <div class="chart-content">
        <CityPopulationRank />
      </div>
    </div>
    <div class="chart-item district-item">
      <div class="item-title">区域显示控制</div>
      <div class="district-row">
        <button
          v-for="name in districtNames"
          :key="name"
          class="district-tag"
          :class="{ off: !store.districts[name] }"
          @click="store.toggleDistrict(name)"
        >
          <span class="dot" :style="{ background: CATEGORY_COLORS[name] }"></span>
          <span class="name">{{ name }}</span>
        </button>
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
import HeatmapPanel from "@/vue/pages/Dashboard/components/HeatmapPanel.vue";
import { CATEGORY_COLORS } from "@/js/constants/categoryColors";

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
  flex: 1.2; /* 与强度排名图弹性分摊剩余空间，避免单块被过度拉伸造成行距稀疏 */
}

.heatmap-panel-wrapper {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 2px 4px;
}

.item-title {
  font-size: 16px;
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

.item-title span {
  font-size: 16px;
  color: rgba(224, 230, 240, 0.4);
  font-weight: 700;
}

.chart-content {
  flex: 1;
  min-height: 0;
}

/* 区域显示控制：一行色块标签（带用地色圆点，点击切换） */
.district-item {
  flex: 0 0 auto; /* 不参与等高分配，按内容高度收窄，省出空间给强度排名图 */
}

.district-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 2px 8px 10px;
}

.district-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background: rgba(15, 20, 32, 0.5);
  border: 1px solid rgba(96, 165, 250, 0.25);
  color: #e0e6f0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: auto;
  letter-spacing: 1px;
}

.district-tag:hover {
  border-color: rgba(96, 165, 250, 0.5);
}

.district-tag.off {
  opacity: 0.45; /* 关闭的区域整体降透明 */
}

.district-tag .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.heatmap-panel-wrapper::-webkit-scrollbar {
  width: 4px;
}
.heatmap-panel-wrapper::-webkit-scrollbar-track {
  background: transparent;
}
.heatmap-panel-wrapper::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
}
.heatmap-panel-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
</style>
