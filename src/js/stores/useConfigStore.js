import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("dashboard", () => {
  const mapPlayComplete = ref(false);
  // cloud / rotation / heat / bar 四键互斥；cloud 为默认激活按钮
  const activeKey = ref('cloud');
  // 中键控制面板，独立开关
  const controlOpen = ref(false);

  // 左侧区域勾选状态
  const districts = ref({
    农业区: true,
    工业区: true,
    住宅区: true,
    商业区: true,
    教育区: true,
  });

  // 筛选控制面板状态（供图表组件共享）
  const year = ref(2025);
  const quarter = ref("Q3");
  const viewMode = ref("standard");

  // 趋势折线图年份尺度：1年 / 3年 / 5年
  const trendYearScale = ref(3);

  // 饼图选中的用地类型（null = 全部未选中）
  const selectedCategory = ref(null);

  // 数据上传预览：分屏 Cesium 模式
  const uploadPreviewActive = ref(false);
  // 数据上传左面板视图切换：'upload' | 'panorama'
  const uploadLeftView = ref('upload');
  // 已上传的文件对象（跨组件重建保持）
  const uploadFile = ref(null);

  // AI Agent 聊天记录
  const aiMessages = ref([]);

  // 回溯播放控制
  const tracebackPlaying = ref(false);
  const tracebackProgress = ref(0);
  const tracebackTickCount = ref(0);

  function tracebackResetTicks() { tracebackTickCount.value = 0; }
  function tracebackTick() { tracebackTickCount.value++; }

  // 建筑观测点缓存（避免 AnalysisLeft / AnalysisRight 重复请求）
  const buildingPointFeatures = ref([]);

  // 3D 热力图配置
  const heatmapConfig = ref({
    enabled: false,
    scaleHeight: 0.08,
    gridSize: 40,
    sigmaMeters: 800,
    opacity: 0.85,
    clampToGround: true,
    power: 2.0,
  });

  function updateHeatmapConfig(patch) {
    Object.assign(heatmapConfig.value, patch);
  }

  function setActive(key) {
    // 强制互斥：始终有且只有一个按钮处于激活状态
    // 点击已激活按钮不再取消，保持激活
    if (activeKey.value === key) return;
    activeKey.value = key;
  }

  function toggleControl() {
    controlOpen.value = !controlOpen.value;
  }

  function toggleDistrict(name) {
    districts.value[name] = !districts.value[name];
  }

  function setYear(v) { year.value = v; }
  function setQuarter(v) { quarter.value = v; }
  function setViewMode(v) {
    // 回溯模式仅在 cloud 面板可用，自动切换
    if (v === 'traceback' && activeKey.value !== 'cloud') {
      activeKey.value = 'cloud';
    }
    viewMode.value = v;
  }
  function setTrendYearScale(v) { trendYearScale.value = v; }

  function setSelectedCategory(name) {
    selectedCategory.value = selectedCategory.value === name ? null : name;
  }

  function setUploadPreview(v) {
    uploadPreviewActive.value = v;
    if (!v) uploadLeftView.value = 'upload';
  }
  function setUploadLeftView(v) { uploadLeftView.value = v; }
  function setUploadFile(v) { uploadFile.value = v; }

  function reset() {
    mapPlayComplete.value = false;
    activeKey.value = 'cloud';
    controlOpen.value = false;
    uploadPreviewActive.value = false;
    uploadLeftView.value = 'upload';
    uploadFile.value = null;
    districts.value = {
      农业区: true,
      工业区: true,
      住宅区: true,
      商业区: true,
      教育区: true,
    };
    year.value = 2025;
    quarter.value = "Q3";
    viewMode.value = "standard";
    trendYearScale.value = 3;
    selectedCategory.value = null;
    tracebackPlaying.value = false;
    tracebackProgress.value = 0;
    tracebackTickCount.value = 0;
    heatmapConfig.value = {
      enabled: false,
      scaleHeight: 0.08,
      gridSize: 40,
      sigmaMeters: 800,
      opacity: 0.85,
      clampToGround: true,
      power: 2.0,
    };
    aiMessages.value = [];
    buildingPointFeatures.value = [];
  }

  return {
    mapPlayComplete, activeKey, controlOpen, districts,
    year, quarter, viewMode, trendYearScale, selectedCategory,
    heatmapConfig, updateHeatmapConfig,
    tracebackPlaying, tracebackProgress,
    tracebackTickCount, tracebackResetTicks, tracebackTick,
    uploadPreviewActive, setUploadPreview, uploadLeftView, setUploadLeftView, uploadFile, setUploadFile,
    aiMessages,
    buildingPointFeatures,
    setActive, toggleControl, toggleDistrict,
    setYear, setQuarter, setViewMode, setTrendYearScale, setSelectedCategory,
    reset,
  };
});
