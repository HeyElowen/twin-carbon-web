<template>
  <div class="footer-wrapper">
    <Transition name="tb-fade">
      <TracebackBar v-if="store.viewMode === 'traceback'" />
    </Transition>
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
      <el-tooltip content="碳排放统计数据" placement="top" :show-after="300">
        <el-button
          :class="['footer-btn', { active: store.activeKey === 'cloud' }]"
          @click="store.setActive('cloud')"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M11 2.04935V13H21.9506C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5228 2 12C2 6.81462 5.94668 2.55107 11 2.04935ZM13 0.542847C18.5535 1.02121 22.9788 5.4465 23.4571 11H13V0.542847Z"></path>
          </svg>
        </el-button>
      </el-tooltip>
      <el-tooltip content="碳排放总体/单体合格评判与建议" placement="top" :show-after="300">
        <el-button
          :class="['footer-btn', { active: store.activeKey === 'rotation' }]"
          @click="store.setActive('rotation')"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM12.1779 7.17624C11.8055 7.06167 11.41 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15C13.2091 15 15 13.2091 15 11C15 10.59 14.9383 10.1945 14.8238 9.82212C14.5102 10.5166 13.8115 11 13 11C11.8954 11 11 10.1046 11 9C11 8.18846 11.4834 7.48982 12.1779 7.17624Z"></path>
          </svg>
        </el-button>
      </el-tooltip>

      <el-tooltip content="筛选面板" placement="top" :show-after="300">
        <el-popover
          v-model:visible="controlVisible"
          placement="top"
          :width="store.uploadPreviewActive ? 440 : 420"
          trigger="click"
          popper-class="control-popover"
        >
          <template #reference>
            <el-button
              :class="['footer-btn', { active: controlVisible }]"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M9.95401 2.2106C11.2876 1.93144 12.6807 1.92263 14.0449 2.20785C14.2219 3.3674 14.9048 4.43892 15.9997 5.07103C17.0945 5.70313 18.364 5.75884 19.4566 5.3323C20.3858 6.37118 21.0747 7.58203 21.4997 8.87652C20.5852 9.60958 19.9997 10.736 19.9997 11.9992C19.9997 13.2632 20.5859 14.3902 21.5013 15.1232C21.29 15.7636 21.0104 16.3922 20.6599 16.9992C20.3094 17.6063 19.9049 18.1627 19.4559 18.6659C18.3634 18.2396 17.0943 18.2955 15.9997 18.9274C14.9057 19.559 14.223 20.6294 14.0453 21.7879C12.7118 22.067 11.3187 22.0758 9.95443 21.7906C9.77748 20.6311 9.09451 19.5595 7.99967 18.9274C6.90484 18.2953 5.63539 18.2396 4.54272 18.6662C3.61357 17.6273 2.92466 16.4164 2.49964 15.1219C3.41412 14.3889 3.99968 13.2624 3.99968 11.9992C3.99968 10.7353 3.41344 9.60827 2.49805 8.87524C2.70933 8.23482 2.98894 7.60629 3.33942 6.99923C3.68991 6.39217 4.09443 5.83576 4.54341 5.33257C5.63593 5.75881 6.90507 5.703 7.99967 5.07103C9.09364 4.43942 9.7764 3.3691 9.95401 2.2106ZM11.9997 14.9992C13.6565 14.9992 14.9997 13.6561 14.9997 11.9992C14.9997 10.3424 13.6565 8.99923 11.9997 8.99923C10.3428 8.99923 8.99967 10.3424 8.99967 11.9992C8.99967 13.6561 10.3428 14.9992 11.9997 14.9992Z"></path>
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
                <el-radio-button v-for="m in viewModes" :key="m.value" :label="m.label" :value="m.value" :disabled="m.disabled" />
              </el-radio-group>
            </div>

            <!-- ── 预览模式下的工具切换 ── -->
            <template v-if="store.uploadPreviewActive">
              <div class="heatmap-divider" />
              <div class="mode-tabs">
                <button class="mode-tab" :class="{ active: previewToolMode === 'heatmap' }" @click="previewToolMode = 'heatmap'">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  热力图
                </button>
                <button class="mode-tab" :class="{ active: previewToolMode === 'extreme' }" @click="previewToolMode = 'extreme'">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M7 15h2V9H7v6zm4-4h2v4h-2v-4zm4-2h2v6h-2V9z"/></svg>
                  极值分析
                </button>
              </div>

              <!-- 热力图工具 -->
              <template v-if="previewToolMode === 'heatmap'">
                <div class="heat-row">
                  <label class="heat-switch">
                    <input type="checkbox" :checked="store.heatmapConfig.enabled" @change="toggleHeatmap" />
                    <span class="heat-slider" />
                    <span class="heat-label">显示热力图</span>
                  </label>
                </div>

                <div class="heat-row">
                  <span class="heat-label">拉伸高度</span>
                  <input type="range" min="0.01" max="0.3" step="0.01"
                    :value="store.heatmapConfig.scaleHeight"
                    @input="store.updateHeatmapConfig({ scaleHeight: parseFloat($event.target.value) })" />
                  <span class="heat-value">{{ store.heatmapConfig.scaleHeight.toFixed(2) }}</span>
                </div>

                <div class="heat-row">
                  <span class="heat-label">扩散半径</span>
                  <input type="range" min="200" max="3000" step="100"
                    :value="store.heatmapConfig.sigmaMeters"
                    @input="store.updateHeatmapConfig({ sigmaMeters: parseInt($event.target.value) })" />
                  <span class="heat-value">{{ store.heatmapConfig.sigmaMeters }}m</span>
                </div>

                <div class="heat-row">
                  <span class="heat-label">网格密度</span>
                  <input type="range" min="20" max="200" step="5"
                    :value="store.heatmapConfig.gridSize"
                    @input="store.updateHeatmapConfig({ gridSize: parseInt($event.target.value) })" />
                  <span class="heat-value">{{ store.heatmapConfig.gridSize }}</span>
                </div>

                <div class="heat-row">
                  <span class="heat-label">透明度</span>
                  <input type="range" min="0.3" max="1.0" step="0.05"
                    :value="store.heatmapConfig.opacity"
                    @input="store.updateHeatmapConfig({ opacity: parseFloat($event.target.value) })" />
                  <span class="heat-value">{{ Math.round(store.heatmapConfig.opacity * 100) }}%</span>
                </div>

                <div class="heat-row">
                  <span class="heat-label">强度幂次</span>
                  <input type="range" min="0.2" max="5.0" step="0.1"
                    :value="store.heatmapConfig.power"
                    @input="store.updateHeatmapConfig({ power: parseFloat($event.target.value) })" />
                  <span class="heat-value">{{ store.heatmapConfig.power.toFixed(1) }}</span>
                </div>
              </template>

              <!-- 极值分析占位 -->
              <template v-if="previewToolMode === 'extreme'">
                <div class="extreme-placeholder">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.2"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M7 15h2V9H7v6zm4-4h2v4h-2v-4zm4-2h2v6h-2V9z"/></svg>
                  <div class="extreme-text">极值分析</div>
                  <div class="extreme-hint">分析各用地类型碳排放极值</div>
                  <div class="extreme-hint" style="font-size:11px;color:rgba(200,208,224,0.25)">（待完善）</div>
                </div>
              </template>
            </template>
          </div>

          <div class="popover-footer">
            <el-text type="info" size="small">筛选条件自动保存，对所有面板生效</el-text>
          </div>
        </el-popover>
      </el-tooltip>

      <el-tooltip content="AI Agent助手" placement="top" :show-after="300">
        <el-button
          :class="['footer-btn', { active: store.activeKey === 'heat' }]"
          @click="store.setActive('heat')"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V8C3 6.34315 4.34315 5 6 5H11V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2ZM0 10H2V16H0V10ZM24 10H22V16H24V10ZM9 14.5C9.82843 14.5 10.5 13.8284 10.5 13C10.5 12.1716 9.82843 11.5 9 11.5C8.17157 11.5 7.5 12.1716 7.5 13C7.5 13.8284 8.17157 14.5 9 14.5ZM16.5 13C16.5 12.1716 15.8284 11.5 15 11.5C14.1716 11.5 13.5 12.1716 13.5 13C13.5 13.8284 14.1716 14.5 15 14.5C15.8284 14.5 16.5 13.8284 16.5 13Z"></path>
          </svg>
        </el-button>
      </el-tooltip>
      <el-tooltip content="数据上传与预览" placement="top" :show-after="300">
        <el-button
          :class="['footer-btn', { active: store.activeKey === 'bar' }]"
          @click="store.setActive('bar')"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M21 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3ZM12 16C10.3431 16 9 14.6569 9 13H4V5H20V13H15C15 14.6569 13.6569 16 12 16ZM16 9H13V6H11V9H8L12 13.5L16 9Z"></path>
          </svg>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Filter } from "@element-plus/icons-vue";
import { useConfigStore } from "@/js/stores/useConfigStore";
import TracebackBar from "./TracebackBar.vue";

const store = useConfigStore();
const controlVisible = ref(false);
// 预览工具模式：'heatmap' | 'extreme'
const previewToolMode = ref('heatmap');

const years = [2023, 2024, 2025];
const quarters = [
  { label: "Q1", value: "Q1" },
  { label: "Q2", value: "Q2" },
  { label: "Q3", value: "Q3" },
  { label: "Q4", value: "Q4" },
  { label: "全年", value: "ALL" },
];
const viewModes = computed(() => [
  { label: "标准", value: "standard", disabled: false },
  { label: "纯净", value: "clean", disabled: false },
  { label: "回溯", value: "traceback", disabled: store.activeKey !== 'cloud' },
]);


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

// 切到极值分析时自动关闭热力图
watch(previewToolMode, (mode) => {
  if (mode === 'extreme' && store.heatmapConfig.enabled) {
    store.updateHeatmapConfig({ enabled: false });
  }
});

function toggleHeatmap(e) {
  store.updateHeatmapConfig({ enabled: e.target.checked });
}
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
/* ── 模式切换标签 ── */
.mode-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}
.mode-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  background: rgba(15, 20, 32, 0.5);
  color: rgba(200, 208, 224, 0.4);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.mode-tab:hover {
  border-color: rgba(59, 130, 246, 0.3);
  color: rgba(200, 208, 224, 0.7);
}
.mode-tab.active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(59, 130, 246, 0.15));
  border-color: rgba(59, 130, 246, 0.4);
  color: #60a5fa;
}

/* ── 极值分析占位 ── */
.extreme-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 8px;
}
.extreme-text {
  font-size: 14px;
  font-weight: 600;
  color: rgba(200, 208, 224, 0.3);
}
.extreme-hint {
  font-size: 12px;
  color: rgba(200, 208, 224, 0.2);
}

/* ── 热力图控制（预览模式） ── */
.heatmap-divider {
  border-top: 1px solid rgba(59, 130, 246, 0.12);
  margin: 10px 0;
}
.heatmap-section-title {
  font-size: 13px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 10px;
}
.heat-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.heat-row:last-child {
  margin-bottom: 0;
}
.heat-label {
  font-size: 12px;
  color: rgba(200, 208, 224, 0.85);
  white-space: nowrap;
  min-width: 60px;
}
.heat-value {
  font-size: 12px;
  color: #60a5fa;
  min-width: 40px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
/* 开关 */
.heat-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;
}
.heat-switch input { display: none; }
.heat-slider {
  position: relative;
  width: 36px;
  height: 18px;
  background: rgba(100, 116, 139, 0.4);
  border-radius: 9px;
  transition: background 0.3s;
  flex-shrink: 0;
}
.heat-slider::after {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  left: 2px;
  top: 2px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}
.heat-switch input:checked + .heat-slider {
  background: rgba(59, 130, 246, 0.6);
}
.heat-switch input:checked + .heat-slider::after {
  transform: translateX(18px);
}
/* range 滑块 */
.heat-row input[type="range"] {
  flex: 1;
  height: 4px;
  background: rgba(100, 116, 139, 0.3);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}
.heat-row input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #60a5fa;
  border-radius: 50%;
  cursor: pointer;
}
.heat-row input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #60a5fa;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

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

.control-popover .el-radio-button.is-disabled .el-radio-button__inner {
  opacity: 0.35;
  cursor: not-allowed;
  border-color: rgba(59, 130, 246, 0.1);
  color: rgba(148, 163, 184, 0.35);
}

.control-popover .el-text.el-text--info {
  color: rgba(224, 230, 240, 0.35);
}

/* 暗色主题 tooltip */
.buttons .el-popper.is-dark {
  background: #0f1420;
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #bfdbfe;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.buttons .el-popper.is-dark .el-popper__arrow::before {
  background: #0f1420;
  border: 1px solid rgba(59, 130, 246, 0.25);
}

/* ── 回溯进度条过渡 ── */
.tb-fade-enter-active,
.tb-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.tb-fade-enter-from,
.tb-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
