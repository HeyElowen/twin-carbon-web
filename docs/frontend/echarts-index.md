# ECharts 开发文档索引

> 按需加载指南：遇到问题时，先查本索引，再加载对应文档。

---

## L1 速查表（优先加载，约 5KB）

`docs/frontend/echarts-async-cheatsheet.md`

覆盖日常开发 80% 场景：
- 快速创建图表（ChartContainer / useChart）
- 数据更新策略（notMerge）
- 异步数据流标准模式
- 常见配置片段（动画、暗色主题、resize）
- 常见错误清单
- SuperMap 3D 联动注意

---

## L2 完整参考（按需加载，共约 180KB）

位于 `docs/reference/echarts/`，按主题分 5 个文件：

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `echarts-handbook-basics.md` | 快速上手、获取/引入 ECharts、版本特性 | 新人入门、环境配置 |
| `echarts-handbook-concepts.md` | 容器/样式/数据集/数据转换/坐标轴/视觉映射/图例/事件 | 深入配置某组件 |
| `echarts-handbook-charts.md` | 柱状图/折线图/饼图/散点图/自定义系列的详细教程 | 学习特定图表类型 |
| `echarts-handbook-advanced.md` | SVG底图/服务端渲染/小程序/动态数据/富文本/动画/拖拽 | 特殊场景 |
| `echarts-handbook-best-practices.md` | Canvas vs SVG / 无障碍 / 安全 | 性能优化、合规 |

---

## 问题 → 文档映射

| 遇到的问题 | 加载文档 |
|-----------|---------|
| 图表怎么创建、数据怎么绑定 | `echarts-async-cheatsheet.md` |
| 图表不随容器缩放 | `echarts-async-cheatsheet.md` → `echarts-handbook-concepts.md`（图表容器章节） |
| 数据集（dataset）怎么用 | `echarts-handbook-concepts.md`（数据集章节） |
| 多系列数据映射混乱 | `echarts-handbook-concepts.md`（数据转换章节） |
| 坐标轴配置（时间轴/类目轴） | `echarts-handbook-concepts.md`（坐标轴章节） |
| 颜色/大小映射（visualMap） | `echarts-handbook-concepts.md`（视觉映射章节） |
| 图例点击交互 | `echarts-handbook-concepts.md`（图例章节） |
| 点击/悬停事件处理 | `echarts-handbook-concepts.md`（事件与行为章节） |
| 柱状图堆叠/排序/瀑布 | `echarts-handbook-charts.md` |
| 折线图堆叠/面积/平滑/阶梯 | `echarts-handbook-charts.md` |
| 饼图圆环/玫瑰图 | `echarts-handbook-charts.md` |
| 动态实时数据更新 | `echarts-async-cheatsheet.md` → `echarts-handbook-advanced.md`（动态异步数据） |
| 富文本标签 | `echarts-handbook-advanced.md`（富文本标签） |
| 数据更新动画 | `echarts-handbook-advanced.md`（数据过渡动画） |
| 拖拽交互 | `echarts-handbook-advanced.md`（拖拽的实现） |
| Canvas vs SVG 选型 | `echarts-handbook-best-practices.md` |
| 无障碍访问 | `echarts-handbook-best-practices.md` |
| 安全相关（XSS） | `echarts-handbook-best-practices.md` |
| 版本升级（v5→v6） | `echarts-handbook-basics.md` |

---

## 代码封装速查

| 封装 | 路径 | 用途 |
|------|------|------|
| `useChart` | `src/composables/useChart.ts` | 单图表生命周期（init/setOption/dispose/ResizeObserver） |
| `ChartContainer` | `src/components/chart/ChartContainer.vue` | 图表容器（集成 loading/empty/error/resize） |
| `useChartDataStore` | `src/stores/chartData.js` | 图表数据状态管理（Pinia） |
