<template>
  <div class="chart-wrapper" :style="wrapperStyle">
    <!-- Loading -->
    <div v-if="loading" class="chart-overlay chart-loading">
      <div class="spinner"></div>
      <span class="overlay-text">加载中...</span>
    </div>

    <!-- Empty -->
    <div v-else-if="empty" class="chart-overlay chart-empty">
      <span class="overlay-icon">📊</span>
      <span class="overlay-text">{{ emptyText }}</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="chart-overlay chart-error">
      <span class="overlay-icon">⚠️</span>
      <span class="overlay-text">{{ errorText }}</span>
    </div>

    <!-- Chart -->
    <div
      v-show="!loading && !empty && !error"
      ref="chartRef"
      class="chart-inner"
      @click="onChartClick"
    ></div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useChart } from '@/composables/useChart'

const props = defineProps({
  /** ECharts option，可以是对象或返回对象的函数 */
  option: { type: [Object, Function], required: true },
  /** 是否正在加载 */
  loading: { type: Boolean, default: false },
  /** 是否为空数据 */
  empty: { type: Boolean, default: false },
  /** 是否出错 */
  error: { type: Boolean, default: false },
  /** 空数据提示文字 */
  emptyText: { type: String, default: '暂无数据' },
  /** 错误提示文字 */
  errorText: { type: String, default: '数据加载失败' },
  /** 容器高度，默认 100%（需父容器有高度） */
  height: { type: String, default: '100%' },
  /** 主题 */
  theme: { type: [String, Object], default: undefined },
  /** 渲染器 */
  renderer: { type: String, default: 'canvas' },
  /** setOption 是否全量替换 */
  notMerge: { type: Boolean, default: true },
  /** 是否自动 resize */
  autoResize: { type: Boolean, default: true }
})

const emit = defineEmits(['click'])

const chartRef = ref(null)

const getOption = () => {
  return typeof props.option === 'function' ? props.option() : props.option
}

const { chartInstance, update, resize } = useChart(
  chartRef,
  getOption,
  {
    theme: props.theme,
    renderer: props.renderer,
    notMerge: props.notMerge,
    autoResize: props.autoResize
  }
)

// option 变化时自动更新
// 注意：不在此处检查 loading/empty/error，因为 v-if/v-show 已控制视觉状态
// 如果在这里阻止 update，loading 结束后再无机会触发（option 引用已不再变化）
watch(
  () => props.option,
  () => update(),
  { deep: true }
)

// loading 从 true → false 时补一次 update（防止 option 和 loading 在同一 tick 变化导致 watch 错过）
watch(() => props.loading, (val, oldVal) => {
  if (oldVal && !val) {
    nextTick(() => update())
  }
})

const wrapperStyle = computed(() => ({
  height: props.height,
  position: 'relative'
}))

function onChartClick(e) {
  emit('click', e)
}

// 暴露方法给父组件
defineExpose({
  chartInstance,
  update,
  resize
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  min-height: 120px;
}

.chart-inner {
  width: 100%;
  height: 100%;
}

.chart-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #6D88A3;
  font-size: 13px;
}

.overlay-icon {
  font-size: 24px;
  opacity: 0.6;
}

.overlay-text {
  color: #6D88A3;
}

.chart-loading .spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(114, 198, 195, 0.2);
  border-top-color: #72C6C3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
