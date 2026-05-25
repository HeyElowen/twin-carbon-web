import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("demo1-config", () => {
  const mapPlayComplete = ref(false);
  // cloud / rotation / heat / bar 四键互斥；null = 显示默认面板
  const activeKey = ref(null);
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

  // 饼图选中的用地类型（null = 全部未选中）
  const selectedCategory = ref(null);

  function setActive(key) {
    if (activeKey.value === key) {
      activeKey.value = null;
      return;
    }
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

  function setSelectedCategory(name) {
    selectedCategory.value = selectedCategory.value === name ? null : name;
  }

  function reset() {
    mapPlayComplete.value = false;
    activeKey.value = null;
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
    selectedCategory.value = null;
  }

  return {
    mapPlayComplete, activeKey, controlOpen, districts,
    year, quarter, viewMode, selectedCategory,
    setActive, toggleControl, toggleDistrict,
    setYear, setQuarter, setViewMode, setSelectedCategory,
    reset,
  };
});
