<template>
  <AutoFit>
    <div :ref="topBox.ref">
      <Header />
    </div>
    <div class="grid-wrapper">
      <div class="card" :ref="leftBox.ref" style="grid-area: 1 / 1 / 7 / 2">
        <div class="card-title">
          {{ leftPanel.title }}<span v-if="leftPanel.subtitle">{{ leftPanel.subtitle }}</span>
        </div>
        <component :is="leftPanel.comp" v-bind="leftPanel.props" :key="leftPanelKey" />
        <!-- 预览模式下的视图切换按钮 -->
        <button
          v-if="showViewToggle"
          class="view-toggle"
          :class="{ panorama: store.uploadLeftView === 'upload' }"
          @click="toggleLeftView"
        >
          <svg v-if="store.uploadLeftView === 'panorama'" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/>
          </svg>
          {{ store.uploadLeftView === 'upload' ? '新数据' : '上传' }}
          <svg v-if="store.uploadLeftView === 'upload'" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M16.172 11H4v2h12.172l-5.364 5.364 1.414 1.414L20 12l-7.778-7.778-1.414 1.414z"/>
          </svg>
        </button>
        <!-- heat 面板视图切换按钮 -->
        <button
          v-if="showHeatToggle"
          class="view-toggle heat-toggle"
          :class="{ workflow: heatView === 'agent' }"
          @click="toggleHeatView"
        >
          <svg v-if="heatView === 'workflow'" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/>
          </svg>
          {{ heatView === 'agent' ? '工作流' : '助手' }}
          <svg v-if="heatView === 'agent'" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M16.172 11H4v2h12.172l-5.364 5.364 1.414 1.414L20 12l-7.778-7.778-1.414 1.414z"/>
          </svg>
        </button>
      </div>
      <div class="card" :ref="rightBox.ref" style="grid-area: 1 / 4 / 7 / 5">
        <div class="card-title">
          {{ rightPanel.title }}<span v-if="rightPanel.subtitle">{{ rightPanel.subtitle }}</span>
        </div>
        <component :is="rightPanel.comp" v-bind="rightPanel.props" :key="store.activeKey" />
      </div>
    </div>
    <div :ref="bottomBox.ref">
      <Footer />
    </div>
  </AutoFit>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { useMoveTo } from "@/js/composables/useMoveTo";
import AutoFit from "@/vue/components/AutoFit.vue";
import Header from "./header.vue";
import Footer from "./footer.vue";
import BarTablePie from "./BarTablePie.vue";
import LineRevenueBar from "./LineRevenueBar.vue";
import AnalysisLeft from "./AnalysisLeft.vue";
import AnalysisRight from "./AnalysisRight.vue";
import DataUpload from "./DataUpload.vue";
import AIAgentLeft from "./AIAgentLeft.vue";
import AIAgentRight from "./AIAgentRight.vue";
import WorkflowPreview from "./WorkflowPreview.vue";

// 默认面板（底部第一个按钮 cloud 与无激活状态时均显示此内容）
const defaultPanels = [
  { title: "碳排放源分析", subtitle: "", comp: BarTablePie, props: {} },
  { title: "碳排放全景监测", subtitle: "", comp: LineRevenueBar, props: {} },
];

const panelConfig = {
  // cloud（第一个按钮）显示默认面板，不再使用云服务占位内容
  cloud: defaultPanels,
  rotation: [
    { title: "碳排放达标分析", subtitle: "", comp: AnalysisLeft, props: {} },
    { title: "极值分析与建议", subtitle: "", comp: AnalysisRight, props: {} },
  ],
  heat: [
    { title: "AI Agent 助手", subtitle: "智能分析", comp: AIAgentLeft, props: {} },
    { title: "对话", subtitle: "", comp: AIAgentRight, props: {} },
  ],
  bar: [
    { title: "数据上传与预览", subtitle: "", comp: DataUpload, props: {} },
    { title: "数据对比分析", subtitle: "", comp: LineRevenueBar, props: {} },
  ],
};

const store = useConfigStore();

// AI Agent 面板视图：'agent' | 'workflow'
const heatView = ref('agent');

const leftPanel = computed(() => {
  const base = panelConfig[store.activeKey]?.[0] || { title: '', comp: null, props: {} };
  // bar 面板预览模式下，支持左面板在「上传」和「全景」间切换
  if (store.activeKey === 'bar' && store.uploadLeftView === 'panorama') {
    return { title: '碳排放全景监测', subtitle: '新数据', comp: LineRevenueBar, props: {} };
  }
  // heat 面板切换至工作流预览
  if (store.activeKey === 'heat' && heatView.value === 'workflow') {
    return { title: '工作流预览', subtitle: '', comp: WorkflowPreview, props: {} };
  }
  return base;
});

const rightPanel = computed(() => {
  const base = panelConfig[store.activeKey]?.[1] || { title: '', comp: null, props: {} };
  // bar 面板预览模式下，右面板标为「旧数据」
  if (store.activeKey === 'bar' && store.uploadPreviewActive) {
    return { ...base, subtitle: '旧数据' };
  }
  return base;
});

// 左面板 key 随视图切换，强制重新渲染组件
const leftPanelKey = computed(() =>
  store.activeKey + (store.activeKey === 'bar' ? '-' + store.uploadLeftView : '') +
  (store.activeKey === 'heat' ? '-' + heatView.value : '')
);

// 预览模式下显示切换按钮
const showViewToggle = computed(() =>
  store.activeKey === 'bar' && store.uploadPreviewActive
);

// heat 面板显示视图切换按钮
const showHeatToggle = computed(() =>
  store.activeKey === 'heat'
);

function toggleLeftView() {
  store.setUploadLeftView(store.uploadLeftView === 'upload' ? 'panorama' : 'upload');
}

function toggleHeatView() {
  heatView.value = heatView.value === 'agent' ? 'workflow' : 'agent';
}

const topBox = useMoveTo("toBottom", 0.6);
const leftBox = useMoveTo("toRight", 0.12, 0);
const rightBox = useMoveTo("toLeft", 0.12, 0);
const bottomBox = useMoveTo("toTop", 0.8, 0.5);

const sideVisible = ref(true);

function animateIn() {
  topBox.restart();
  bottomBox.restart();
  leftBox.restart();
  rightBox.restart();
  sideVisible.value = true;
}

function showSide() {
  if (!sideVisible.value) {
    leftBox.restart();
    rightBox.restart();
    sideVisible.value = true;
  }
}

function hideSide() {
  if (sideVisible.value) {
    leftBox.reverse();
    rightBox.reverse();
    sideVisible.value = false;
  }
}

// 地图加载完成后播放入场动画
watch(() => store.mapPlayComplete, (v) => { if (v) animateIn(); });

// activeKey 变化时：回溯/纯净模式自动切回标准；标准模式先退出再进入
watch(() => store.activeKey, (key) => {
  if (store.viewMode === 'clean' || store.viewMode === 'traceback') {
    store.setViewMode('standard');
    return;
  }
  // 离开 heat 面板时重置视图
  if (key !== 'heat') heatView.value = 'agent';
  hideSide();
  setTimeout(() => showSide(), 150);
});

// viewMode 变化时：回溯/纯净模式隐藏面板；退出时显示面板
watch(() => store.viewMode, (newMode, oldMode) => {
  if (newMode === 'clean') {
    hideSide();
  } else if (oldMode === 'clean' || oldMode === 'traceback') {
    showSide();
  }
});
</script>

<style scoped>
.grid-wrapper {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  position: relative;
  background: rgba(15, 20, 32, 0.75);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 15px;
  backdrop-filter: blur(4px);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 9999;
}

.card::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  width: 10px;
  height: 10px;
  border-top: 2px solid #3b82f6;
  border-left: 2px solid #3b82f6;
  transition: all 0.3s ease;
  pointer-events: none;
}

.card::after {
  content: "";
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #3b82f6;
  border-right: 2px solid #3b82f6;
  transition: all 0.3s ease;
  pointer-events: none;
}

.card:hover::before,
.card:hover::after {
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.card-title {
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #3b82f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e0e6f0;
}

.card-title span {
  font-size: 10px;
  color: rgba(224, 230, 240, 0.4);
  font-weight: normal;
}

/* ── 左面板视图切换按钮 ── */
.view-toggle {
  position: absolute;
  right: -32px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-left: none;
  border-radius: 0 10px 10px 0;
  background: rgba(15, 20, 32, 0.85);
  color: #60a5fa;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  writing-mode: vertical-lr;
  letter-spacing: 2px;
  transition: all 0.25s ease;
  z-index: 10;
  backdrop-filter: blur(6px);
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.3);
}

.view-toggle:hover {
  background: rgba(25, 35, 60, 0.95);
  border-color: rgba(59, 130, 246, 0.5);
  color: #93c5fd;
  padding-right: 10px;
}

.view-toggle svg {
  writing-mode: horizontal-tb;
}

.view-toggle.panorama {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.3);
}

.view-toggle.panorama:hover {
  border-color: rgba(52, 211, 153, 0.5);
  color: #6ee7b7;
}

.heat-toggle {
  right: -38px;
}

.heat-toggle.workflow {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.3);
}

.heat-toggle.workflow:hover {
  border-color: rgba(52, 211, 153, 0.5);
  color: #6ee7b7;
}

</style>
