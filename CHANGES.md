# 城市碳排放三维可视化系统 — 修改记录

## 一、全屏 3D 地图 + 浮动面板布局

**改动文件**: `src/App.vue`, `src/views/home.vue`

- 移除三栏 flex 布局，Cesium 容器覆盖 100vw×100vh
- 顶栏/底栏改为 `position: fixed` 半透明浮动覆盖
- 左右两侧工具栏改为浮动可拖拽面板

---

## 二、浮动可拖拽面板 (FloatingPanel)

**新建文件**: `src/components/FloatingPanel.vue`

- 基于 Pointer Events 的自定义拖拽（统一鼠标+触控）
- 边界约束，不超出视口
- 折叠/展开功能，`@collapse-change` 事件
- 右下角缩放手柄，拖拽调整面板宽高（minWidth: 220px, minHeight: 150px）
- `panelId` prop + `@dock` emit 向外通知挂起意向
- `@dock-hint` emit：拖拽到边缘 80px 内时通知父组件高亮 DockArea
- `@drag-end` emit：松手时报告最终位置，父组件记录用于挂起恢复
- 拖拽期间全局禁用文字选中（`selectstart` 事件）
- 松手时若靠近边缘自动触发挂起

---

## 三、挂起系统 (DockArea + useDockStore)

**新建文件**: `src/composables/useDockStore.js`, `src/components/DockArea.vue`

### useDockStore (模块级 singleton)
- `dockedPanels`: `{ left: [], right: [] }` — 各侧已挂起面板
- `expandedId`: `{ left: null, right: null }` — 手风琴：每侧最多展开一个
- `panelRegistry`: 面板元信息注册
- 方法: `registerPanel`, `unregisterPanel`, `dockPanel`, `undockPanel`, `toggleExpand`, `isPanelDocked`, `isPanelExpanded`, `getPanelSide`

### DockArea
- `position: fixed`，z-index: 60，top: 72px，bottom: 40px
- 折叠态 44px 宽 → 展开态 280px 宽
- 折叠态：竖排标题 + 展开按钮（取消挂起按钮隐藏）
- 展开态：标题 + 展开/折叠按钮 + 取消挂起按钮（均在右上角）
- `hintActive` prop：边缘吸附提示时内发光效果
- 拖拽标题栏解除挂起：pointerdown → 移动超 10px → undockPanel + emit undockDrag
- 展开面板撑满侧边栏高度（`.dock-item.is-expanded { flex: 1 }`）

---

## 四、内容组件提取

**新建文件**: `src/components/LeftPanelContent.vue`, `src/components/RightPanelContent.vue`

- **LeftPanelContent**: 年份/季度筛选、el-segmented 图表模式切换、图例、el-upload Excel 上传
- **RightPanelContent**: ECharts 饼图 + 折线图、对象查询、结果卡片、趋势 tab
  - 自管理 ECharts 生命周期（onMounted init + ResizeObserver + onUnmounted dispose）
  - `defineExpose({ resize })` 供父组件在挂起展开时手动触发
- 所有响应式状态通过 `v-model`（defineModel）双向绑定，父组件持有

---

## 五、Excel 文件上传

**改动文件**: `src/components/LeftPanelContent.vue`, `src/views/home.vue`

- `el-upload` 组件：`list-type="picture-card"`, `auto-upload="false"`, `accept=".xlsx,.xls,.csv"`, `limit="1"`
- `fileList` 通过 `defineModel` + `v-model:file-list` 由父组件持有，避免悬浮/挂起切换时丢失
- 上传触发区 80×80px，显示 Plus 图标 + "Excel" 文字
- 文件选中后触发区隐藏，显示绿色 XLS 图标 + 文件名 + 红色关闭按钮
- 自定义 `#file` 插槽替代默认缩略图

---

## 六、交互细节完善

### 拖拽体验
- 拖拽/缩放期间全局 `selectstart` 禁用，防止文字选中
- 面板 z-index 动态提升（空闲 100 → 激活 +100 → 拖拽中 +200）

### 边缘吸附提示
- 面板靠近边缘（< 80px）：蓝色左边框 + 蓝色投影
- 对应 DockArea：内发光高亮

### 挂起状态切换
- 浮动 → 挂起：v-if 隐藏 FloatingPanel，DockArea 显示
- 挂起 → 浮动：undockPanel 移除，FloatingPanel 以记忆位置重现
- 拖出挂起：DockArea header 拖拽触发 undockDrag，面板在鼠标位置弹出
- 所有响应式状态（filterYear, activeTab, searchText, fileList...）由父组件持有，切换不丢失

---

## 文件清单

| 文件 | 状态 | 说明 |
|------|------|------|
| `src/composables/useDockStore.js` | 新建 | 挂起系统共享状态 |
| `src/components/DockArea.vue` | 新建 | 侧边栏挂起容器 |
| `src/components/FloatingPanel.vue` | 重写 | 浮动可拖拽可缩放面板 |
| `src/components/LeftPanelContent.vue` | 新建 | 左侧面板内容（含上传） |
| `src/components/RightPanelContent.vue` | 新建 | 右侧面板内容（含图表） |
| `src/views/home.vue` | 重写 | 主页面，集成所有组件 |
| `src/App.vue` | 修改 | 添加 #cesiumContainer |
| `CLAUDE.md` | 新建 | 项目文档 |
