# Agent 开发指南

## 项目概述

- **名称**：twin-carbon-web（城市碳排放三维可视化系统前端）
- **技术栈**：Vue 3 + Vite + Pinia + ECharts 6 + Axios + Element Plus
- **3D 引擎**：原生 Cesium API（通过 `public/Cesium/Cesium.js` 引入）
- **数据**：图表数据全部异步加载（Mock/真实 API 可通过 `src/request/request.js` 切换）

## ECharts 开发参考

本项目所有图表数据均为异步加载，开发时请优先使用封装好的组件/hook。

### 快速创建图表

```vue
<ChartContainer
  :option="chartOption"
  :loading="chartStore.loading"
  :empty="!chartStore.data.length"
  height="180px"
/>
```

### 封装清单

| 封装 | 路径 | 说明 |
|------|------|------|
| `useChart` | `src/composables/useChart.ts` | 单图表生命周期管理（init / setOption / dispose / ResizeObserver） |
| `ChartContainer` | `src/components/chart/ChartContainer.vue` | 通用图表容器，内置 loading / 空数据 / 错误状态 |
| `useChartDataStore` | `src/stores/chartData.js` | 图表数据 Pinia Store |

### 文档体系

| 文档 | 路径 | 用途 |
|------|------|------|
| 异步数据速查表 | `docs/frontend/echarts-async-cheatsheet.md` | **优先加载**，覆盖日常开发 80% 场景 |
| 问题索引 | `docs/frontend/echarts-index.md` | 问题 → 文档映射，按需定位 |
| 完整参考 | `docs/reference/echarts/` | ECharts 官方手册全部 48 篇内容，分 5 个文件 |

## 重要约定

1. **不要直接 `import * as echarts from 'echarts'` 后在组件里写 init/dispose**。请使用 `useChart` 或 `ChartContainer`。
2. **图表数据走 Pinia Store**，不要在组件内直接发请求。
3. **Mock 开关**在 `src/request/request.js` 第 5 行 `USE_MOCK`，切换 true/false 即可。
4. **Cesium 实例**在 `src/views/cesiumMap.vue` 中管理，已补充 `viewer.destroy()`，路由切换时自动释放。
