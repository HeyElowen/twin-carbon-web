# ECharts 异步数据开发速查表

> 适用于 twin-carbon-web 项目（Vue3 + Pinia + ECharts 6）

---

## 1. 快速创建一个图表

### 方式 A：使用 ChartContainer（推荐，含 loading/空态/错误态）

```vue
<template>
  <ChartContainer
    :option="chartOption"
    :loading="chartStore.loading"
    :empty="!chartStore.pieData.length"
    height="180px"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useChartDataStore } from '@/stores/chartData'
import ChartContainer from '@/components/chart/ChartContainer.vue'

const chartStore = useChartDataStore()

const chartOption = computed(() => ({
  xAxis: { type: 'category', data: chartStore.trendData.map(d => d.name) },
  yAxis: { type: 'value' },
  series: [{
    type: 'line',
    data: chartStore.trendData.map(d => d.value)
  }]
}))
</script>
```

### 方式 B：使用 useChart（更灵活，需自己管理状态）

```vue
<script setup>
import { ref, computed } from 'vue'
import { useChart } from '@/composables/useChart'

const chartRef = ref(null)
const option = computed(() => ({ /* ... */ }))

const { chartInstance, update, resize } = useChart(chartRef, () => option.value)
</script>

<template>
  <div ref="chartRef" style="height: 180px"></div>
</template>
```

---

## 2. 数据更新策略

| 场景 | notMerge | 行为 |
|------|----------|------|
| 数据刷新（同结构换数据） | `false`（默认） | 增量合并，保留用户交互（缩放、图例开关） |
| 切换图表类型（如柱状→折线） | `true` | 全量替换，清除旧系列 |
| 首次渲染 | `true` | 确保干净初始化 |

```ts
// ChartContainer 默认 notMerge = true
// useChart 默认 notMerge = true

// 如需增量合并（保留交互状态）
<ChartContainer :option="option" :not-merge="false" />
```

---

## 3. 异步数据流标准模式

```
用户操作 → Pinia Action → API 请求 → Store 更新 → computed option 变化
                                                    ↓
                                              ChartContainer watch 自动 setOption
```

**Store 示例：**

```ts
// stores/chartData.js
const loading = ref(false)
const pieData = ref([])

async function load(params) {
  loading.value = true
  try {
    const res = await getCategoryRatio(params)
    pieData.value = res.data || []
  } finally {
    loading.value = false
  }
}
```

**组件中使用：**

```vue
<ChartContainer
  :option="pieOption"
  :loading="chartStore.loading"
  :empty="!chartStore.pieData.length"
/>
```

---

## 4. 常见配置片段

### 响应式容器

ChartContainer 和 useChart 内部已用 `ResizeObserver` 处理，无需额外代码。

如需手动触发：

```ts
const { resize } = useChart(...)
// 或
chartContainerRef.value?.resize()
```

### 动画过渡

```js
option = {
  animation: true,
  animationDuration: 300,
  animationDurationUpdate: 300,   // 数据更新动画
  universalTransition: { enabled: true }  // ECharts 5+ 跨类型动画
}
```

### 暗色主题适配

项目整体为暗色 UI，图表建议统一配色：

```js
const CHART_COLORS = {
  agriculture: '#27AE60',
  commercial: '#9B59B6',
  school: '#E74C3C',
  industry: '#F39C12',
  residential: '#5BA3D9'
}
```

---

## 5. 常见错误与解决

| 问题 | 原因 | 解决 |
|------|------|------|
| 图表不显示 | 容器高度为 0 | 确保父容器有明确高度，或给 ChartContainer 传 `height` |
| 图表不随窗口缩放 | 旧代码用了 `window.resize` | 已用 ResizeObserver，无需处理 |
| 数据更新后旧数据残留 | notMerge 为 false | 切换指标时设 `:not-merge="true"` |
| 路由切换后内存泄漏 | 未 dispose echarts 实例 | useChart / ChartContainer 已自动处理 |
| 热更新后图表空白 | 旧实例未销毁 | useChart init 前会先 dispose |
| 容器还没挂载就 init | DOM ref 为 null | useChart 已做 nextTick + null 检查 |

---

## 6. 与 SuperMap 3D 场景联动注意

- Cesium 容器 `z-index: 1`，图表面板 `z-index: 50+`，层级已隔离
- 如需在 3D 场景上叠加图表（如气泡标注），需用 `echarts-gl` 或 Cesium 贴图方案，**不能直接用 DOM 叠加**
- Cesium 实例生命周期：`cesiumMap.vue` 已补充 `viewer.destroy()`，路由切换时自动释放 WebGL 上下文

---

## 7. 文件速查

| 文件 | 用途 |
|------|------|
| `src/composables/useChart.ts` | 单图表生命周期封装 |
| `src/components/chart/ChartContainer.vue` | 通用图表容器（含状态） |
| `src/stores/chartData.js` | 图表数据 Store |
| `docs/frontend/echarts-index.md` | 问题 → 文档映射索引 |
| `docs/reference/echarts/` | ECharts 官方手册完整内容 |
