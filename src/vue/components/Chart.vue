<template>
  <div ref="chartBox" class="chart-wrapper" :style="style" v-loading="loading" element-loading-background="rgba(7,10,14,0.6)"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, shallowRef, watch, nextTick } from "vue";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

echarts.use(CanvasRenderer);

const props = defineProps({
  option: { type: Object, required: true },
  use: { type: Array, required: true },
  style: { type: Object, default: () => ({}) },
  theme: { type: [String, Object], default: undefined },
  loading: { type: Boolean, default: false },
});

const chartBox = ref(null);
const chartInst = shallowRef(null);
let initialized = false;

echarts.use(props.use);

onMounted(async () => {
  await nextTick();
  if (!chartBox.value) return;

  chartInst.value = echarts.init(chartBox.value);
  chartInst.value.setOption(props.option, {
    notMerge: true,
    lazyUpdate: true,
  });
  initialized = true;
});

onUnmounted(() => {
  chartInst.value?.dispose();
  chartInst.value = null;
  initialized = false;
});

watch(
  () => props.option,
  (newOption) => {
    if (!chartInst.value || !initialized) return;
    chartInst.value.setOption(newOption, {
      notMerge: false,
      lazyUpdate: true,
      replaceMerge: ["series"],
    });
  }
);

defineExpose({ chartInstance: chartInst });
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
}
</style>
