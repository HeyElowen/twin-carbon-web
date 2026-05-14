<template>
  <div class="carbon-emission-app">
    <!-- 浮动顶栏 -->
   <header class="header-float">
    <svg class="header-bg" viewBox="0 0 1920 72" preserveAspectRatio="none">
        <defs>
            <linearGradient id="hdrGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#1b2e46" stop-opacity="0.97" />
                <stop offset="55%" stop-color="#203347" stop-opacity="0.92" />
                <stop offset="100%" stop-color="#243549" stop-opacity="0.78" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(114,198,195,0)" />
                <stop offset="25%" stop-color="rgba(114,198,195,0.7)" />
                <stop offset="75%" stop-color="rgba(114,198,195,0.7)" />
                <stop offset="100%" stop-color="rgba(114,198,195,0)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <!-- ✅ 已修复：主体形状上边界改为完整直线，彻底消除顶部空白 -->
        <path d="M0,0 L1920,0 L1920,26 L1540,26 Q1505,26 1470,44 Q1435,60 1370,60 L550,60 Q485,60 450,44 Q415,26 380,26 L0,26 Z"
            fill="url(#hdrGrad)" />

        <!-- 底部流向发光条（位置不变） -->
        <path d="M450,60 L550,60 L1370,60 L1470,60" stroke="url(#glowGrad)" stroke-width="1.5" fill="none"
            filter="url(#glow)" />

        <!-- ✅ 已调整：两侧装饰细线下移至形状外部，避免被主体遮挡 -->
        <path d="M200,64 Q350,64 460,68" stroke="rgba(114,198,195,0.25)" stroke-width="0.8" fill="none" />
        <path d="M1720,64 Q1570,64 1460,68" stroke="rgba(114,198,195,0.25)" stroke-width="0.8" fill="none" />

        <!-- 顶部贯穿细线（现贴合形状上边缘） -->
        <line x1="0" y1="0.5" x2="1920" y2="0.5" stroke="rgba(114,198,195,0.4)" stroke-width="1" />
    </svg>
    <h1>城市碳排放三维可视化系统</h1>
</header>

    <!-- 浮动左侧工具栏 -->
    <FloatingPanel
      v-if="!dockStore.isPanelDocked('left-panel')"
      :initialX="leftPanelPos.x"
      :initialY="leftPanelPos.y"
      :width="270"
      panelId="left-panel"
      :title="leftPanelTitle"
      @dock="onDockPanel"
      @drag-end="(pos) => onDragEnd('left-panel', pos)"
      @dock-hint="onDockHint"
    >
      <LayerControlPanel
        v-model:filter-year="filterYear"
        v-model:filter-quarter="filterQuarter"
        v-model:active-tab="activeTab"
        v-model:file-list="uploadFileList"
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
      title=""
      @dock="onDockPanel"
      @drag-end="(pos) => onDragEnd('right-panel', pos)"
      @collapse-change="onRightFloatingCollapseChange"
      @dock-hint="onDockHint"
    >
      <DataStatsPanel
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
        <LayerControlPanel
          v-model:filter-year="filterYear"
          v-model:filter-quarter="filterQuarter"
          v-model:active-tab="activeTab"
          v-model:file-list="uploadFileList"
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
        <DataStatsPanel
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
        <LayerControlPanel
          v-model:filter-year="filterYear"
          v-model:filter-quarter="filterQuarter"
          v-model:active-tab="activeTab"
          v-model:file-list="uploadFileList"
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
        <DataStatsPanel
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
import { ref, nextTick, watch, computed } from 'vue'
import FloatingPanel from '../components/FloatingPanel.vue'
import DockArea from '../components/DockArea.vue'
import LayerControlPanel from '../components/LayerControlPanel.vue'
import DataStatsPanel from '../components/DataStatsPanel.vue'
import { useDockStore } from '../composables/useDockStore'

const dockStore = useDockStore()

// 注册面板到挂起系统
dockStore.registerPanel('left-panel', '碳排放柱状图')
dockStore.registerPanel('right-panel', '数据统计')

// 面板位置记忆（用于取消挂起后恢复位置）
const leftPanelPos = ref({ x: 16, y: 72 })
const rightPanelPos = ref({ x: window.innerWidth - 336, y: 72 })

// 边缘吸附提示
const dockHintSide = ref(null)

function onDockHint(side) {
  dockHintSide.value = side
}

// 上传文件列表 — 父组件持有，避免悬挂/悬浮切换时丢失
const uploadFileList = ref([])

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
const leftPanelTitle = computed(() =>
  activeTab.value === 'heat' ? '碳排放热力图' : '碳排放柱状图'
)
const chartModes = [
  { label: '热力图', value: 'heat' },
  { label: '柱状图', value: 'bar' }
]

// 标题同步到挂起系统
watch(activeTab, (val) => {
  dockStore.updatePanelTitle('left-panel', val === 'heat' ? '碳排放热力图' : '碳排放柱状图')
})
const trendTab = ref('全部')
const trendTabs = ['全部', '商业', '工业', '农业', '住宅']

// 图例
const legendList = ref([
  { color: '#E74C3C', label: 'school' },
  { color: '#2ECC71', label: '农业' },
  { color: '#9B59B6', label: '工业' },
  { color: '#E67E22', label: '商业' },
  { color: '#3498DB', label: '住宅' }
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
  height: 72px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10px;
  z-index: 50;
  pointer-events: none;
}

.header-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.header-float h1 {
  color: #e2e8f0;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
  pointer-events: auto;
  z-index: 1;
  text-shadow: 0 0 20px rgba(114, 198, 195, 0.35);
  animation: titleGlow 3s ease-in-out infinite;
}

.header-float h1::before,
.header-float h1::after {
  content: '';
  display: inline-block;
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(114,198,195,0.7));
  vertical-align: middle;
  margin: 0 14px;
}

.header-float h1::after {
  background: linear-gradient(90deg, rgba(114,198,195,0.7), transparent);
}

@keyframes titleGlow {
  0%, 100% { text-shadow: 0 0 12px rgba(114,198,195,0.25), 0 0 30px rgba(114,198,195,0.1); }
  50% { text-shadow: 0 0 24px rgba(114,198,195,0.5), 0 0 50px rgba(114,198,195,0.25); }
}

/* ── 浮动底栏 ── */
.footer-float {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 36px;
  background: rgba(27, 46, 70, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(73, 93, 104, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6D88A3;
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
  color: #72C6C3;
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
  color: #6D88A3;
  margin-bottom: 4px;
}

.scale-line {
  position: relative;
  width: 80px;
  height: 2px;
  background: #495D68;
}

.scale-tick {
  position: absolute;
  top: -4px;
  width: 1px;
  height: 10px;
  background: #495D68;
}

.scale-tick.left { left: 0; }
.scale-tick.right { right: 0; }

</style>
