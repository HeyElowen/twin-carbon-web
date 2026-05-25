<template>
  <div class="footer-wrapper">
    <svg
      viewBox="0 0 1920 100"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <path
        d="M0,100 H1920 V100 Q1600,100 1450,100 Q1300,80 1200,60 Q960,10 720,60 Q620,80 470,100 Q320,100 0,100 Z"
        fill="transparent"
        stroke="none"
      ></path>

      <path
        d="M0,100 Q320,100 470,100 Q620,80 720,60 Q960,10 1200,60 Q1300,80 1450,100 Q1600,100 1920,100"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeOpacity="0.35"
      ></path>

      <path
        d="M720,60 Q960,10 1200,60"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="5"
        strokeLinecap="round"
      ></path>
    </svg>

    <div class="buttons">
      <el-button
        :class="['footer-btn', { active: store.activeKey === 'cloud' }]"
        @click="store.setActive('cloud')"
      >
        <svg fill="currentColor" viewBox="0 0 1024 1024" width="24" height="24">
          <path d="M746.666667 725.333333c59.733333-12.8 106.666667-64 106.666666-128 0-72.533333-55.466667-128-128-128-17.066667 0-29.866667 4.266667-42.666666 8.533334V469.333333c0-93.866667-76.8-170.666667-170.666667-170.666666s-170.666667 76.8-170.666667 170.666666c0 17.066667 4.266667 29.866667 4.266667 46.933334-8.533333-4.266667-17.066667-4.266667-25.6-4.266667C260.266667 512 213.333333 558.933333 213.333333 618.666667S260.266667 725.333333 320 725.333333h426.666667z m0 85.333334h-426.666667C213.333333 810.666667 128 725.333333 128 618.666667c0-85.333333 55.466667-157.866667 128-183.466667C273.066667 311.466667 379.733333 213.333333 512 213.333333c110.933333 0 209.066667 72.533333 243.2 170.666667 102.4 12.8 183.466667 102.4 183.466667 213.333333s-85.333333 200.533333-192 213.333334z"></path>
        </svg>
      </el-button>
      <el-button
        :class="['footer-btn', { active: store.activeKey === 'rotation' }]"
        @click="store.setActive('rotation')"
      >
        <svg fill="currentColor" viewBox="0 0 1024 1024" width="24" height="24">
          <path d="M492.416 658.176L230.826667 504.32V196.565333L492.373333 42.666667l261.589334 153.898666v307.754667l-261.589334 153.856z m200.064-184.661333V276.565333l-169.301333 103.296v197.888l169.301333-104.234666z m-400.128 0l169.301333 104.192V370.816L292.352 269.354667v204.16z m200.064-369.28L316.672 212.352l179.2 107.306667h6.912l170.624-104.149334-180.992-111.274666zM569.344 858.24L430.848 981.333333v-96.213333C194.901333 864.298667 0 750.208 0 612.053333c0-62.250667 36.949333-119.466667 98.389333-165.632l40.533334 42.666667c-48.64 34.858667-77.354667 77.184-77.354667 122.922667 0 105.813333 167.424 193.365333 369.28 211.541333V735.146667l138.496 123.093333zM646.314667 813.056c161.834667-30.976 276.949333-109.226667 276.949333-201.045333 0-51.2-35.882667-98.218667-95.616-135.168l42.453333-42.453334c71.552 48.128 114.730667 110.037333 114.730667 177.621334 0 122.709333-142.037333 226.645333-338.517333 262.997333v-61.952z"></path>
        </svg>
      </el-button>

      <el-popover
        v-model:visible="controlVisible"
        placement="top"
        :width="480"
        trigger="click"
        popper-class="control-popover"
      >
        <template #reference>
          <el-button
            :class="['footer-btn', { active: controlVisible }]"
          >
            <svg fill="currentColor" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M874.666667 21.333333l47.509333 101.824L1024 170.666667l-101.824 47.509333L874.666667 320l-47.509334-101.824L725.333333 170.666667l101.824-47.509334zM512 21.333333l156.138667 334.528L1002.666667 512l-334.528 156.138667L512 1002.666667l-156.138667-334.528L21.333333 512l334.528-156.138667L512 21.333333z m107.968 382.698667L512 172.650667l-107.968 231.381333L172.650667 512l231.381333 107.968 107.946667 231.36 107.989333-231.36L851.328 512l-231.36-107.946667z"></path>
            </svg>
          </el-button>
        </template>

        <div class="popover-header">
          <el-icon :size="18" color="#60a5fa"><Filter /></el-icon>
          <span>筛选控制面板</span>
        </div>

        <div class="popover-body">
          <div class="filter-section">
            <span class="filter-label">年份</span>
            <el-radio-group v-model="filters.year" size="small">
              <el-radio-button v-for="y in years" :key="y" :label="y" :value="y" />
            </el-radio-group>
          </div>
          <div class="filter-section">
            <span class="filter-label">季度</span>
            <el-radio-group v-model="filters.quarter" size="small">
              <el-radio-button v-for="q in quarters" :key="q.value" :label="q.label" :value="q.value" />
            </el-radio-group>
          </div>
          <div class="filter-section">
            <span class="filter-label">数据查看模式</span>
            <el-radio-group v-model="filters.viewMode" size="small">
              <el-radio-button v-for="m in viewModes" :key="m.value" :label="m.label" :value="m.value" />
            </el-radio-group>
          </div>
        </div>

        <div class="popover-footer">
          <el-text type="info" size="small">筛选条件自动保存，对所有面板生效</el-text>
        </div>
      </el-popover>

      <el-button
        :class="['footer-btn', { active: store.activeKey === 'heat' }]"
        @click="store.setActive('heat')"
      >
        <svg fill="currentColor" viewBox="0 0 1024 1024" width="24" height="24">
          <path d="M781.981888 1014.033538C649.277769 945.497049 431.312619 990.61918 298.608501 972.93895 165.904382 955.25872 80.23377 832.725854 35.111639 706.301971-80.32183 383.00634 113.136746 295.287826 270.483965 302.387223 427.899447 309.691411 362.093496 148.180122 582.720919 27.558632 803.348343-93.062859 862.874059 217.126192 838.367485 287.574057 813.792648 358.021923 796.863316 425.32967 963.357836 601.858915 1129.852355 778.456422 914.686006 1082.706555 781.981888 1014.033538ZM891.408175 606.432565C745.66574 458.778754 743.413046 396.044657 768.397464 329.692597 789.900446 272.214785 777.886081 13.22331 589.478999 113.229243 401.071917 213.30344 457.730569 374.746465 324.207289 370.650659 190.615746 366.554852 7.601475 440.279363 102.28286 701.250477 139.281642 803.236049 225.976205 884.810855 338.474347 897.644381 450.972489 910.54617 634.259813 878.735409 746.211847 932.868314 858.163882 987.069481 1031.0069 747.874403 891.408175 606.432565ZM650.09693 792.51869C581.014333 766.646848 565.723324 679.337914 586.270618 607.388253 606.886175 535.302065 543.947288 435.773976 514.730537 379.866222 485.58205 323.753678 553.708959 197.671113 626.068201 178.352561 743.549573 146.95138 684.365175 331.7405 689.280142 455.092528 694.331636 578.444556 870.314773 658.79062 868.47166 734.28998 866.628548 809.789339 719.111263 818.458796 650.09693 792.51869ZM471.997627 693.058865C411.379696 748.01093 334.105487 776.886363 255.943853 750.604941 177.918747 724.255255 125.902009 596.124786 186.519939 541.991882 310.076758 431.541643 323.04681 547.179903 423.803641 498.098493 524.492209 449.085346 532.547294 638.106799 471.997627 693.058865Z"></path>
        </svg>
      </el-button>
      <el-button
        :class="['footer-btn', { active: store.activeKey === 'bar' }]"
        @click="store.setActive('bar')"
      >
        <svg fill="currentColor" viewBox="0 0 1024 1024" width="24" height="24">
          <path d="M211.176727 809.425455a34.909091 34.909091 0 0 1-34.909091-34.909091V367.522909a34.909091 34.909091 0 0 1 69.818182 0v406.993455a34.909091 34.909091 0 0 1-34.909091 34.909091z m329.821091-34.909091V90.298182a34.909091 34.909091 0 0 0-69.818182 0v684.218182a34.909091 34.909091 0 0 0 69.818182 0z m289.000727 0V367.522909a34.909091 34.909091 0 0 0-69.818181 0v406.993455a34.909091 34.909091 0 0 0 69.818181 0zM977.454545 933.701818a34.909091 34.909091 0 0 0-34.90909-34.909091H81.454545a34.909091 34.909091 0 0 0 0 69.818182h861.09091a34.909091 34.909091 0 0 0 34.90909-34.909091z"></path>
        </svg>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Filter } from "@element-plus/icons-vue";
import { useConfigStore } from "@/js/stores/useConfigStore";

const store = useConfigStore();
const controlVisible = ref(false);

const years = [2023, 2024, 2025];
const quarters = [
  { label: "Q1", value: "Q1" },
  { label: "Q2", value: "Q2" },
  { label: "Q3", value: "Q3" },
  { label: "Q4", value: "Q4" },
  { label: "全年", value: "ALL" },
];
const viewModes = [
  { label: "标准", value: "standard" },
  { label: "纯净", value: "clean" },
  { label: "回溯", value: "traceback" },
];

const filters = ref({
  year: store.year,
  quarter: store.quarter,
  viewMode: store.viewMode,
});

// 同步到 Pinia Store
watch(() => filters.value.year, (v) => store.setYear(v));
watch(() => filters.value.quarter, (v) => store.setQuarter(v));
watch(() => filters.value.viewMode, (v) => store.setViewMode(v));
// 反向同步：外部修改 viewMode 时更新筛选面板（如纯净模式下激活按钮自动切回标准）
watch(() => store.viewMode, (v) => { filters.value.viewMode = v; });
</script>

<style scoped>
.footer-wrapper {
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  background: transparent;
  z-index: 100;
}

.buttons {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 30px;
  z-index: 10;
  padding-bottom: 20px;
}

.footer-btn {
  width: 52px;
  height: 52px;
  padding: 0;
  background: linear-gradient(180deg, rgba(35, 48, 75, 0.85) 0%, rgba(18, 24, 40, 0.95) 100%);
  border: 1.5px solid rgba(96, 165, 250, 0.25);
  color: rgba(148, 180, 240, 0.75);
  border-radius: 16px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  box-shadow:
    0 4px 14px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.08),
    0 0 0 1px rgba(59, 130, 246, 0.06);
}

.footer-btn:hover {
  transform: translateY(-5px) scale(1.08);
  border-color: rgba(96, 165, 250, 0.6);
  box-shadow:
    0 10px 28px rgba(37, 99, 235, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.12),
    0 0 20px rgba(59, 130, 246, 0.18);
  color: #bfdbfe;
  background: linear-gradient(180deg, rgba(45, 65, 100, 0.9) 0%, rgba(25, 38, 65, 0.95) 100%);
}

.footer-btn.active {
  width: 60px;
  height: 60px;
  background: linear-gradient(145deg, #1d4ed8 0%, #3b82f6 55%, #60a5fa 100%);
  color: #ffffff;
  border: 1.5px solid rgba(147, 197, 253, 0.45);
  border-radius: 18px;
  box-shadow:
    0 6px 24px rgba(37, 99, 235, 0.45),
    0 0 0 4px rgba(59, 130, 246, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
  margin-bottom: 6px;
}

.footer-btn.active:hover {
  box-shadow:
    0 8px 30px rgba(37, 99, 235, 0.6),
    0 0 0 6px rgba(59, 130, 246, 0.18),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
  background: linear-gradient(145deg, #1e40af 0%, #2563eb 55%, #3b82f6 100%);
  color: #ffffff;
}

.popover-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #e0e6f0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.12);
}

.popover-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(224, 230, 240, 0.6);
  min-width: 40px;
  flex-shrink: 0;
}

.popover-footer {
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid rgba(59, 130, 246, 0.08);
}
</style>

<style>
.control-popover.el-popover {
  background: #0f1420;
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(59, 130, 246, 0.1);
}

.control-popover .el-popover__title {
  color: #e0e6f0;
}

.control-popover .el-radio-button__inner {
  background: rgba(15, 20, 32, 0.8);
  border-color: rgba(59, 130, 246, 0.25);
  color: rgba(224, 230, 240, 0.7);
}

.control-popover .el-radio-button__original-radio:checked + .el-radio-button__inner {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  border-color: transparent;
  color: white;
  box-shadow: none;
}

.control-popover .el-text.el-text--info {
  color: rgba(224, 230, 240, 0.35);
}
</style>
