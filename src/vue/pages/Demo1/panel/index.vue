<template>
  <AutoFit>
    <div :ref="topBox.ref">
      <Header />
    </div>
    <div class="grid-wrapper">
      <div class="card" :ref="leftBox.ref" style="grid-area: 1 / 1 / 7 / 2">
        <div class="card-title">
          {{ panels[0].title }}<span>{{ panels[0].subtitle }}</span>
        </div>
        <component :is="panels[0].comp" v-bind="panels[0].props" :key="store.activeKey" />
      </div>
      <div class="card" :ref="rightBox.ref" style="grid-area: 1 / 4 / 7 / 5">
        <div class="card-title">
          {{ panels[1].title }}<span>{{ panels[1].subtitle }}</span>
        </div>
        <component :is="panels[1].comp" v-bind="panels[1].props" :key="store.activeKey" />
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
import PlaceholdersLeft from "./PlaceholdersLeft.vue";
import PlaceholdersRight from "./PlaceholdersRight.vue";

const panelConfig = {
  mode: [
    { title: "综合指标分析", subtitle: "COMPREHENSIVE INDICATORS", comp: BarTablePie, props: {} },
    { title: "收益与税收分析", subtitle: "REVENUE & TAX", comp: LineRevenueBar, props: {} },
  ],
  cloud: [
    { title: "云服务总览", subtitle: "CLOUD OVERVIEW", comp: PlaceholdersLeft, props: { items: [
      { title: "云服务概览", subtitle: "CLOUD OVERVIEW", props: { title: "弹性计算资源", subtitle: "实时监控云服务运行状态" } },
      { title: "云安全态势", subtitle: "SECURITY STATUS", props: { title: "安全事件统计", subtitle: "近24小时威胁检测" } },
      { title: "云网络延迟", subtitle: "NETWORK LATENCY", props: { title: "区域网络时延", subtitle: "平均延迟 12ms" } },
    ] } },
    { title: "云监控与账单", subtitle: "CLOUD MONITORING", comp: PlaceholdersRight, props: { items: [
      { title: "云资源监控", subtitle: "RESOURCE MONITOR", props: { title: "CPU / 内存 / 带宽", subtitle: "资源利用率趋势" } },
      { title: "云存储分析", subtitle: "STORAGE ANALYSIS", props: { title: "存储容量分布", subtitle: "对象存储 / 块存储 / 文件存储" } },
      { title: "云服务账单", subtitle: "SERVICE BILLING", props: { title: "本月费用概览", subtitle: "按服务类型分类统计" } },
    ] } },
  ],
  rotation: [
    { title: "数据流转概览", subtitle: "DATA FLOW", comp: PlaceholdersLeft, props: { items: [
      { title: "数据流转概览", subtitle: "DATA FLOW", props: { title: "流转链路总览", subtitle: "实时数据管道监控" } },
      { title: "数据源分析", subtitle: "SOURCE ANALYSIS", props: { title: "数据源构成", subtitle: "API / 数据库 / 流式接入" } },
      { title: "数据质量评估", subtitle: "QUALITY ASSESS", props: { title: "数据质量评分", subtitle: "完整性 / 准确性 / 一致性" } },
    ] } },
    { title: "流转监控与告警", subtitle: "FLOW MONITORING", comp: PlaceholdersRight, props: { items: [
      { title: "流转速率监控", subtitle: "FLOW RATE", props: { title: "吞吐量趋势", subtitle: "当前 2.4GB/s" } },
      { title: "流转路径追踪", subtitle: "PATH TRACKING", props: { title: "数据流转拓扑", subtitle: "端到端链路追踪" } },
      { title: "异常流转告警", subtitle: "ALERT", props: { title: "异常事件列表", subtitle: "近1小时告警汇总" } },
    ] } },
  ],
  heat: [
    { title: "热力分布概览", subtitle: "HEAT OVERVIEW", comp: PlaceholdersLeft, props: { items: [
      { title: "热力分布总览", subtitle: "HEAT OVERVIEW", props: { title: "区域热力指数", subtitle: "基于实时数据聚合" } },
      { title: "热点密度分析", subtitle: "DENSITY ANALYSIS", props: { title: "热点密度分布", subtitle: "高密度区域标记" } },
      { title: "热力预警阈值", subtitle: "ALERT THRESHOLD", props: { title: "预警配置", subtitle: "阈值动态调整" } },
    ] } },
    { title: "热度排名与对比", subtitle: "HEAT RANKING", comp: PlaceholdersRight, props: { items: [
      { title: "区域热度排名", subtitle: "HEAT RANKING", props: { title: "热度 TOP 10", subtitle: "按区域聚合统计" } },
      { title: "温度趋势监控", subtitle: "TEMP TREND", props: { title: "温度变化曲线", subtitle: "过去24小时趋势" } },
      { title: "能耗热力对比", subtitle: "ENERGY COMPARE", props: { title: "能耗热力图", subtitle: "同比 / 环比分析" } },
    ] } },
  ],
  bar: [
    { title: "柱状统计概览", subtitle: "BAR STATISTICS", comp: PlaceholdersLeft, props: { items: [
      { title: "数据柱状统计", subtitle: "BAR STATISTICS", props: { title: "核心指标概览", subtitle: "按月聚合统计" } },
      { title: "趋势柱状图", subtitle: "TREND CHART", props: { title: "长期趋势", subtitle: "近12个月数据" } },
      { title: "占比分布分析", subtitle: "DISTRIBUTION", props: { title: "占比构成", subtitle: "各品类份额" } },
    ] } },
    { title: "对比分析与检测", subtitle: "COMPARISON & DETECTION", comp: PlaceholdersRight, props: { items: [
      { title: "指标对比分析", subtitle: "COMPARISON", props: { title: "多维度对比", subtitle: "同比 / 环比 / 目标达成" } },
      { title: "分类数据汇总", subtitle: "CATEGORY SUMMARY", props: { title: "数据分类统计", subtitle: "按业务线划分" } },
      { title: "异常数据标记", subtitle: "ANOMALY MARK", props: { title: "异常检测结果", subtitle: "离群点标记与归因" } },
    ] } },
  ],
};

const store = useConfigStore();
const panels = computed(() => panelConfig[store.activeKey] || panelConfig.mode);

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

// activeKey 变化时：标准模式先退出再进入；纯净模式只退出
watch(() => store.activeKey, (newKey) => {
  // 如果有按钮被激活，且当前是纯净模式，自动切换到标准模式
  if (newKey !== null && store.viewMode === 'clean') {
    store.setViewMode('standard');
    return;
  }

  if (store.viewMode === 'clean') {
    hideSide();
  } else {
    hideSide();
    setTimeout(() => showSide(), 150);
  }
});

// viewMode 变化时：进入纯净模式隐藏面板；退出纯净模式显示面板
watch(() => store.viewMode, (newMode, oldMode) => {
  if (newMode === 'clean') {
    if (store.activeKey !== null) {
      store.setActive(null); // 取消按钮激活，由 activeKey watch 处理动画
    } else {
      hideSide();
    }
  } else if (oldMode === 'clean') {
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
  border-radius: 4px;
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
</style>
