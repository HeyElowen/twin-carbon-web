<template>
  <div class="heatmap-panel">
    <div class="panel-title">3D 碳排放热力图</div>

    <!-- 显示开关 -->
    <div class="control-row">
      <label class="switch-label">
        <input
          type="checkbox"
          :checked="modelValue.enabled"
          @change="$emit('update:modelValue', { ...modelValue, enabled: $event.target.checked })"
        />
        <span class="slider" />
        <span class="label-text">显示热力图</span>
      </label>
    </div>

    <!-- 拉伸高度 -->
    <div class="control-row">
      <span class="label-text">拉伸高度</span>
      <input
        type="range"
        min="0.01"
        max="0.3"
        step="0.01"
        :value="modelValue.scaleHeight"
        @input="$emit('update:modelValue', { ...modelValue, scaleHeight: parseFloat($event.target.value) })"
      />
      <span class="value-text">{{ modelValue.scaleHeight.toFixed(2) }}</span>
    </div>

    <!-- 扩散半径 -->
    <div class="control-row">
      <span class="label-text">扩散半径</span>
      <input
        type="range"
        min="200"
        max="3000"
        step="100"
        :value="modelValue.sigmaMeters"
        @input="$emit('update:modelValue', { ...modelValue, sigmaMeters: parseInt($event.target.value) })"
      />
      <span class="value-text">{{ modelValue.sigmaMeters }}m</span>
    </div>

    <!-- 网格密度 -->
    <div class="control-row">
      <span class="label-text">网格密度</span>
      <input
        type="range"
        min="20"
        max="200"
        step="5"
        :value="modelValue.gridSize"
        @input="$emit('update:modelValue', { ...modelValue, gridSize: parseInt($event.target.value) })"
      />
      <span class="value-text">{{ modelValue.gridSize }}</span>
    </div>

    <!-- 透明度 -->
    <div class="control-row">
      <span class="label-text">透明度</span>
      <input
        type="range"
        min="0.3"
        max="1.0"
        step="0.05"
        :value="modelValue.opacity"
        @input="$emit('update:modelValue', { ...modelValue, opacity: parseFloat($event.target.value) })"
      />
      <span class="value-text">{{ Math.round(modelValue.opacity * 100) }}%</span>
    </div>

    <!-- 强度幂次（power）：>1 压缩低值突出高排放，<1 扩大低值让密集区域更热 -->
    <div class="control-row">
      <span class="label-text">强度幂次</span>
      <input
        type="range"
        min="0.2"
        max="5.0"
        step="0.1"
        :value="modelValue.power"
        @input="$emit('update:modelValue', { ...modelValue, power: parseFloat($event.target.value) })"
      />
      <span class="value-text">{{ modelValue.power.toFixed(1) }}</span>
    </div>

    <!-- 图例 -->
    <div class="legend">
      <div class="legend-title">排放量等级</div>
      <div class="legend-bar">
        <div class="legend-gradient" />
      </div>
      <div class="legend-labels">
        <span>低</span>
        <span>中低</span>
        <span>中</span>
        <span>中高</span>
        <span>高</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      enabled: false,
      scaleHeight: 0.08,
      gridSize: 40,
      sigmaMeters: 800,
      opacity: 0.85,
      clampToGround: true,
      power: 2.0,
    }),
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.heatmap-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #c8d0e0;
  font-size: 12px;
  overflow: auto;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.15);
}

.control-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.control-row:last-child {
  margin-bottom: 0;
}

.label-text {
  font-size: 16px;
  color: rgba(200, 208, 224, 0.85);
  white-space: nowrap;
  min-width: 60px;
}

.value-text {
  font-size: 16px;
  color: #60a5fa;
  min-width: 40px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* 开关 */
.switch-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex: 1;
}

.switch-label input {
  display: none;
}

.slider {
  position: relative;
  width: 36px;
  height: 18px;
  background: rgba(100, 116, 139, 0.4);
  border-radius: 9px;
  transition: background 0.3s;
  flex-shrink: 0;
}

.slider::after {
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

.switch-label input:checked + .slider {
  background: rgba(59, 130, 246, 0.6);
}

.switch-label input:checked + .slider::after {
  transform: translateX(18px);
}

/* 滑块 */
input[type="range"] {
  flex: 1;
  height: 4px;
  background: rgba(100, 116, 139, 0.3);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #60a5fa;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #60a5fa;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* 图例 */
.legend {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
}

.legend-title {
  font-size: 14px;
  color: rgba(200, 208, 224, 0.6);
  margin-bottom: 6px;
}

.legend-bar {
  height: 10px;
  border-radius: 2px;
  overflow: hidden;
}

.legend-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    #00ff00 0%,
    #ffff00 25%,
    #ffa500 50%,
    #ff0000 75%,
    #8b0000 100%
  );
}

.legend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: rgba(200, 208, 224, 0.5);
  margin-top: 3px;
}
</style>
