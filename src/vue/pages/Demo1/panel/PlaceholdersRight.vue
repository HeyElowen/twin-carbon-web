<template>
  <div class="charts-group">
    <div class="chart-item" v-for="(item, i) in items" :key="i">
      <div class="item-title">{{ item.title }}<span>{{ item.subtitle }}</span></div>
      <div class="chart-content">
        <PanelBlank v-bind="item.props" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PanelBlank from "./placeholders/PanelBlank.vue";

defineProps({
  items: { type: Array, required: true },
});
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
