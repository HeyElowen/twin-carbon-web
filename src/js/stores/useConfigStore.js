import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("demo1-config", () => {
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
  function setViewMode(v) { viewMode.value = v; }
  function setTrendYearScale(v) { trendYearScale.value = v; }

  function setSelectedCategory(name) {
    selectedCategory.value = selectedCategory.value === name ? null : name;
  }

  function reset() {
    mapPlayComplete.value = false;
    activeKey.value = 'cloud';
    controlOpen.value = false;
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
    heatmapConfig.value = {
      enabled: false,
      scaleHeight: 0.08,
      gridSize: 40,
      sigmaMeters: 800,
      opacity: 0.85,
      clampToGround: true,
      power: 2.0,
    };
  }

  return {
    mapPlayComplete, activeKey, controlOpen, districts,
    year, quarter, viewMode, trendYearScale, selectedCategory,
    heatmapConfig, updateHeatmapConfig,
    setActive, toggleControl, toggleDistrict,
    setYear, setQuarter, setViewMode, setTrendYearScale, setSelectedCategory,
    reset,
  };
});
