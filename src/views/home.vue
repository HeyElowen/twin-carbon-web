<template>
  <div class="carbon-emission-app">
    <!-- 浮动顶栏 -->
    <header class="header-float">
      <h1>城市碳排放三维可视化系统</h1>
    </header>

    <!-- 浮动左侧工具栏 -->
    <FloatingPanel
      v-if="!dockStore.isPanelDocked('left-panel')"
      :initialX="leftPanelPos.x"
      :initialY="leftPanelPos.y"
      :width="270"
      panelId="left-panel"
      title="图层控制"
      @dock="onDockPanel"
      @drag-end="(pos) => onDragEnd('left-panel', pos)"
      @dock-hint="onDockHint"
    >
      <LeftPanelContent
        v-model:filter-year="filterYear"
        v-model:filter-quarter="filterQuarter"
        v-model:active-tab="activeTab"
        :years="years"
        :quarters="quarters"
        :chartModes="chartModes"
        :legendList="legendList"
        @confirm="onConfirm"
        @add-data="onAddData"
        @preview="onPreview"
        @save="onSave"
      />
    </FloatingPanel>

    <!-- 浮动右侧工具栏 -->
    <FloatingPanel
      v-if="!dockStore.isPanelDocked('right-panel')"
      :initialX="rightPanelPos.x"
      :initialY="rightPanelPos.y"
      :width="320"
      panelId="right-panel"
      title="数据统计"
      @dock="onDockPanel"
      @drag-end="(pos) => onDragEnd('right-panel', pos)"
      @collapse-change="onRightFloatingCollapseChange"
      @dock-hint="onDockHint"
    >
      <RightPanelContent
        ref="floatingRightRef"
        v-model:search-text="searchText"
        v-model:trend-tab="trendTab"
        :trendTabs="trendTabs"
        @search="onSearch"
      />
    </FloatingPanel>

    <!-- 左侧挂起区域 — 支持任意面板挂起到左侧 -->
    <DockArea side="left" :hint-active="dockHintSide === 'left'" @undock-drag="onUndockDrag">
      <template #left-panel>
        <LeftPanelContent
          v-model:filter-year="filterYear"
          v-model:filter-quarter="filterQuarter"
          v-model:active-tab="activeTab"
          :years="years"
          :quarters="quarters"
          :chartModes="chartModes"
          :legendList="legendList"
          @confirm="onConfirm"
          @add-data="onAddData"
          @preview="onPreview"
          @save="onSave"
        />
      </template>
      <template #right-panel>
        <RightPanelContent
          ref="dockRightRef"
          v-model:search-text="searchText"
          v-model:trend-tab="trendTab"
          :trendTabs="trendTabs"
          @search="onSearch"
        />
      </template>
    </DockArea>

    <!-- 右侧挂起区域 — 支持任意面板挂起到右侧 -->
    <DockArea side="right" :hint-active="dockHintSide === 'right'" @undock-drag="onUndockDrag">
      <template #left-panel>
        <LeftPanelContent
          v-model:filter-year="filterYear"
          v-model:filter-quarter="filterQuarter"
          v-model:active-tab="activeTab"
          :years="years"
          :quarters="quarters"
          :chartModes="chartModes"
          :legendList="legendList"
          @confirm="onConfirm"
          @add-data="onAddData"
          @preview="onPreview"
          @save="onSave"
        />
      </template>
      <template #right-panel>
        <RightPanelContent
          ref="dockRightRef2"
          v-model:search-text="searchText"
          v-model:trend-tab="trendTab"
          :trendTabs="trendTabs"
          @search="onSearch"
        />
      </template>
    </DockArea>

    <!-- 地图覆盖元素 -->
    <div class="compass">
      <div class="compass-n">N</div>
    </div>

    <div class="scale-bar">
      <div class="scale-text">比例尺</div>
      <div class="scale-line">
        <div class="scale-tick left"></div>
        <div class="scale-tick right"></div>
      </div>
    </div>

    <!-- 浮动底栏 -->
    <footer class="footer-float">
      2025年 城市碳排放可视化系统 | 热力图
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import FloatingPanel from '../components/FloatingPanel.vue'
import DockArea from '../components/DockArea.vue'
import LeftPanelContent from '../components/LeftPanelContent.vue'
import RightPanelContent from '../components/RightPanelContent.vue'
import { useDockStore } from '../composables/useDockStore'

const dockStore = useDockStore()

// 注册面板到挂起系统
dockStore.registerPanel('left-panel', '图层控制')
dockStore.registerPanel('right-panel', '数据统计')

// 面板位置记忆（用于取消挂起后恢复位置）
const leftPanelPos = ref({ x: 16, y: 72 })
const rightPanelPos = ref({ x: window.innerWidth - 336, y: 72 })

// 边缘吸附提示
const dockHintSide = ref(null)

function onDockHint(side) {
  dockHintSide.value = side
}

// 组件引用 — 用于手动触发图表 resize
const floatingRightRef = ref(null)
const dockRightRef = ref(null)
const dockRightRef2 = ref(null)

// 获取当前活跃的挂起右侧图表组件引用
function getDockRightRef() {
  const side = dockStore.getPanelSide('right-panel')
  if (side === 'left') return dockRightRef
  if (side === 'right') return dockRightRef2
  return null
}

// 筛选数据
const years = ['2025', '2024', '2023', '2022']
const quarters = ['第一季度', '第二季度', '第三季度', '第四季度']
const filterYear = ref('2025')
const filterQuarter = ref('第二季度')
const searchText = ref('')

// 标签页
const activeTab = ref('bar')
const chartModes = [
  { label: '热力图', value: 'heat' },
  { label: '柱状图', value: 'bar' }
]
const trendTab = ref('全部')
const trendTabs = ['全部', '商业', '工业', '农业', '住宅']

// 图例
const legendList = ref([
  { color: '#E74C3C', label: 'school' },
  { color: '#27AE60', label: '农业' },
  { color: '#F39C12', label: '工业' },
  { color: '#9B59B6', label: '商业' },
  { color: '#5BA3D9', label: '住宅' }
])

// ── 挂起事件 ──
function onDockPanel({ panelId, side }) {
  dockStore.dockPanel(panelId, side)
}

function onDragEnd(panelId, pos) {
  if (panelId === 'left-panel') leftPanelPos.value = pos
  else if (panelId === 'right-panel') rightPanelPos.value = pos
}

// 从挂起区域拖出 → 解除挂起并定位到鼠标位置
function onUndockDrag({ panelId, x, y }) {
  const offsetX = panelId === 'left-panel' ? 135 : 160
  if (panelId === 'left-panel') {
    leftPanelPos.value = { x: Math.max(0, x - offsetX), y: Math.max(0, y - 20) }
  } else if (panelId === 'right-panel') {
    rightPanelPos.value = { x: Math.max(0, x - offsetX), y: Math.max(0, y - 20) }
  }
}

// ── 右侧面板折叠展开 ──
function onRightFloatingCollapseChange(expanded) {
  if (expanded) {
    nextTick(() => floatingRightRef.value?.resize())
  }
}

// 右侧面板挂起展开时 → 触发 resize
watch(
  () => dockStore.isPanelExpanded('right-panel', 'left') || dockStore.isPanelExpanded('right-panel', 'right'),
  (expanded) => {
    if (expanded) {
      nextTick(() => getDockRightRef()?.value?.resize())
    }
  }
)

// ── 事件 ──
const onConfirm = () => {
  console.log('筛选确认', filterYear.value, filterQuarter.value)
}

const onAddData = () => {
  console.log('添加数据')
}

const onPreview = () => {
  console.log('预览')
}

const onSave = () => {
  console.log('保存')
}

const onSearch = () => {
  console.log('搜索', searchText.value)
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.carbon-emission-app {
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}

/* ── 浮动顶栏 ── */
.header-float {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 56px;
  background: rgba(58, 69, 86, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  pointer-events: none;
}

.header-float h1 {
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
  pointer-events: auto;
}

/* ── 浮动底栏 ── */
.footer-float {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 36px;
  background: rgba(245, 247, 250, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(208, 213, 220, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  z-index: 50;
  pointer-events: none;
}

/* ── 地图覆盖元素 ── */
.compass {
  position: fixed;
  top: 72px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.compass-n {
  font-size: 16px;
  font-weight: bold;
  color: #e74c3c;
}

.scale-bar {
  position: fixed;
  bottom: 50px;
  left: 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scale-text {
  font-size: 11px;
  color: #333;
  margin-bottom: 4px;
}

.scale-line {
  position: relative;
  width: 80px;
  height: 2px;
  background: #333;
}

.scale-tick {
  position: absolute;
  top: -4px;
  width: 1px;
  height: 10px;
  background: #333;
}

.scale-tick.left { left: 0; }
.scale-tick.right { right: 0; }
</style>
