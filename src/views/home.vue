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

        <path d="M0,0 L1920,0 L1920,26 L1540,26 Q1505,26 1470,44 Q1435,60 1370,60 L550,60 Q485,60 450,44 Q415,26 380,26 L0,26 Z"
          fill="url(#hdrGrad)" />
        <path d="M450,60 L550,60 L1370,60 L1470,60" stroke="url(#glowGrad)" stroke-width="1.5" fill="none"
          filter="url(#glow)" />
        <path d="M200,64 Q350,64 460,68" stroke="rgba(114,198,195,0.25)" stroke-width="0.8" fill="none" />
        <path d="M1720,64 Q1570,64 1460,68" stroke="rgba(114,198,195,0.25)" stroke-width="0.8" fill="none" />
        <line x1="0" y1="0.5" x2="1920" y2="0.5" stroke="rgba(114,198,195,0.4)" stroke-width="1" />
      </svg>

      <!-- 左侧面板切换按钮 -->
      <div class="header-left">
        <div class="panel-toggles">
          <button
            v-for="panel in panelConfigs"
            :key="panel.id"
            :class="{ active: isPanelActive(panel.id) }"
            @click="togglePanel(panel.id)"
          >
            {{ panel.title }}
          </button>
        </div>
      </div>

      <h1>城市碳排放三维可视化系统</h1>

      <!-- 右侧全局筛选 -->
      <div class="header-right">
        <div class="global-filter">
          <el-select v-model="filterStore.filterYear" size="small" style="width: 80px">
            <el-option v-for="y in filterStore.years" :key="y" :label="y" :value="y" />
          </el-select>
          <el-select v-model="filterStore.filterQuarter" size="small" style="width: 110px">
            <el-option v-for="q in filterStore.quarters" :key="q" :label="q" :value="q" />
          </el-select>
          <el-button type="primary" size="small" @click="onGlobalConfirm">确认</el-button>
        </div>
      </div>
    </header>

    <!-- 浮动面板（配置驱动） -->
    <template v-for="panel in panelConfigs" :key="panel.id">
      <FloatingPanel
        v-if="dockStore.isPanelVisible(panel.id) && !dockStore.isPanelDocked(panel.id)"
        :initialX="panelPositions[panel.id].x"
        :initialY="panelPositions[panel.id].y"
        :width="panel.width"
        :panelId="panel.id"
        :title="panel.title"
        @dock="onDockPanel"
        @drag-end="(pos) => onDragEnd(panel.id, pos)"
        @dock-hint="onDockHint"
      >
        <template v-if="panel.id === 'layer-control'">
          <LayerControlPanel
            v-model:active-tab="activeTab"
            v-model:file-list="uploadFileList"
            :chartModes="chartModes"
            :legendList="legendList"
          />
        </template>
        <template v-else-if="panel.id === 'data-stats'">
          <DataStatsPanel
            v-model:search-text="searchText"
            v-model:trend-tab="trendTab"
            :trendTabs="trendTabs"
          />
        </template>
      </FloatingPanel>
    </template>

    <!-- 左侧挂起区域 -->
    <DockArea side="left" :hint-active="dockHintSide === 'left'" @undock-drag="onUndockDrag">
      <template #layer-control>
        <LayerControlPanel
          v-if="dockStore.isPanelDocked('layer-control') && dockStore.getPanelSide('layer-control') === 'left'"
          v-model:active-tab="activeTab"
          v-model:file-list="uploadFileList"
          :chartModes="chartModes"
          :legendList="legendList"
        />
      </template>
      <template #data-stats>
        <DataStatsPanel
          v-if="dockStore.isPanelDocked('data-stats') && dockStore.getPanelSide('data-stats') === 'left'"
          v-model:search-text="searchText"
          v-model:trend-tab="trendTab"
          :trendTabs="trendTabs"
        />
      </template>
    </DockArea>

    <!-- 右侧挂起区域 -->
    <DockArea side="right" :hint-active="dockHintSide === 'right'" @undock-drag="onUndockDrag">
      <template #layer-control>
        <LayerControlPanel
          v-if="dockStore.isPanelDocked('layer-control') && dockStore.getPanelSide('layer-control') === 'right'"
          v-model:active-tab="activeTab"
          v-model:file-list="uploadFileList"
          :chartModes="chartModes"
          :legendList="legendList"
        />
      </template>
      <template #data-stats>
        <DataStatsPanel
          v-if="dockStore.isPanelDocked('data-stats') && dockStore.getPanelSide('data-stats') === 'right'"
          v-model:search-text="searchText"
          v-model:trend-tab="trendTab"
          :trendTabs="trendTabs"
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
import { ref, markRaw } from 'vue'
import FloatingPanel from '../components/FloatingPanel.vue'
import DockArea from '../components/DockArea.vue'
import LayerControlPanel from '../components/LayerControlPanel.vue'
import DataStatsPanel from '../components/DataStatsPanel.vue'
import { useDockStore } from '../composables/useDockStore'
import { usePanelFilterStore } from '../stores/panelFilter'
import { useMapDataStore } from '../stores/mapData'
import { useChartDataStore } from '../stores/chartData'

const dockStore = useDockStore()
const filterStore = usePanelFilterStore()
const mapStore = useMapDataStore()
const chartStore = useChartDataStore()

// ── 面板配置表 ──
const panelConfigs = [
  {
    id: 'layer-control',
    title: '图层控制',
    width: 270,
    defaultPos: { x: 16, y: 72 },
    component: markRaw(LayerControlPanel)
  },
  {
    id: 'data-stats',
    title: '数据统计',
    width: 320,
    defaultPos: { x: window.innerWidth - 336, y: 72 },
    component: markRaw(DataStatsPanel)
  }
]

// 注册面板
panelConfigs.forEach(p => dockStore.registerPanel(p.id, p.title))

// 默认显示现有面板（后续新面板可默认隐藏）
dockStore.showPanel('layer-control')
dockStore.showPanel('data-stats')

// 面板位置记忆
const panelPositions = ref(
  Object.fromEntries(panelConfigs.map(p => [p.id, { ...p.defaultPos }]))
)

// 边缘吸附提示
const dockHintSide = ref(null)

function onDockHint(side) {
  dockHintSide.value = side
}

// 跨实例共享状态
const uploadFileList = ref([])
const activeTab = ref('bar')
const searchText = ref('')
const trendTab = ref('全部')

const chartModes = [
  { label: '热力图', value: 'heat' },
  { label: '柱状图', value: 'bar' }
]

const trendTabs = ['全部', '商业', '工业', '农业', '住宅', '教育']

const legendList = ref([
  { color: '#E74C3C', label: '教育区' },
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
  panelPositions.value[panelId] = pos
}

function onUndockDrag({ panelId, x, y }) {
  const offsetX = panelId === 'layer-control' ? 135 : 160
  panelPositions.value[panelId] = {
    x: Math.max(0, x - offsetX),
    y: Math.max(0, y - 20)
  }
}

async function onGlobalConfirm() {
  filterStore.confirm()
  const params = filterStore.getParams()

  const tasks = []
  if (isPanelActive('layer-control')) {
    tasks.push(mapStore.load(params))
  }
  if (isPanelActive('data-stats')) {
    tasks.push(chartStore.load(params))
  }
  await Promise.all(tasks)
}

function togglePanel(id) {
  dockStore.togglePanel(id)
}

function isPanelActive(id) {
  return dockStore.isPanelVisible(id) || dockStore.isPanelDocked(id)
}
</script>

<style scoped>
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
  align-items: center;
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

/* 顶栏左右区域 */
.header-left {
  position: absolute;
  left: 20px;
  top: 14px;
  pointer-events: auto;
  z-index: 10;
}

.header-right {
  position: absolute;
  right: 20px;
  top: 14px;
  pointer-events: auto;
  z-index: 10;
}

/* ── 面板切换按钮 ── */
.panel-toggles {
  display: flex;
  gap: 6px;
}

.panel-toggles button {
  padding: 4px 12px;
  background: rgba(36, 53, 73, 0.8);
  border: 1px solid rgba(73, 93, 104, 0.5);
  border-radius: 4px;
  color: #cbd5e1;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.panel-toggles button:hover {
  background: rgba(114, 198, 195, 0.15);
  border-color: rgba(114, 198, 195, 0.4);
}

.panel-toggles button.active {
  background: rgba(114, 198, 195, 0.2);
  border-color: rgba(114, 198, 195, 0.6);
  color: #72C6C3;
}

/* ── 全局筛选 ── */
.global-filter {
  display: flex;
  align-items: center;
  gap: 8px;
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
