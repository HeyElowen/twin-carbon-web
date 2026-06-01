<template>
  <div class="traceback-bar">
    <svg viewBox="0 0 500 40" width="100%" height="100%" preserveAspectRatio="none">
      <!-- 背景弧线 -->
      <path d="M 30 34 Q 250 6 470 34" fill="none" stroke="rgba(59, 130, 246, 0.12)" stroke-width="2" />
      <!-- 进度弧线 -->
      <path d="M 30 34 Q 250 6 470 34" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"
        :style="{ strokeDasharray: totalLength, strokeDashoffset: progressOffset }" />
      <!-- 刻度 -->
      <g v-for="(t, i) in tickPositions" :key="i">
        <line
          :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2"
          :stroke="i <= currentStep ? '#3b82f6' : 'rgba(148, 163, 184, 0.25)'"
          :stroke-width="i <= currentStep ? 2.5 : 1.5" stroke-linecap="round"
        />
        <text
          :x="t.lx" :y="t.ly"
          :fill="i <= currentStep ? 'rgba(147, 197, 253, 0.85)' : 'rgba(148, 163, 184, 0.3)'"
          font-size="8" text-anchor="middle" font-family="monospace"
        >{{ t.label }}</text>
      </g>
      <!-- 进度指示圆点 -->
      <circle
        v-if="currentStep >= 0"
        :cx="tickPositions[currentStep]?.cx"
        :cy="tickPositions[currentStep]?.cy"
        r="4.5" fill="#3b82f6" stroke="#1e40af" stroke-width="2"
      />
    </svg>

    <!-- 浮层控制按钮 -->
    <div class="controls-overlay">
      <button class="ctrl-btn" @click="replay" title="重播" :disabled="currentStep === 0 && !isPlaying">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
      </button>
      <button class="ctrl-btn" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
        <svg v-if="isPlaying" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    </div>

    <!-- 当前季度标 -->
    <div class="quarter-label">{{ currentLabel }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { useConfigStore } from "@/js/stores/useConfigStore";

const store = useConfigStore();

// ── 12 个季度序列（2023Q1 ~ 2025Q4） ──
const quarterSequence = [
  { year: 2023, quarter: "Q1" },
  { year: 2023, quarter: "Q2" },
  { year: 2023, quarter: "Q3" },
  { year: 2023, quarter: "Q4" },
  { year: 2024, quarter: "Q1" },
  { year: 2024, quarter: "Q2" },
  { year: 2024, quarter: "Q3" },
  { year: 2024, quarter: "Q4" },
  { year: 2025, quarter: "Q1" },
  { year: 2025, quarter: "Q2" },
  { year: 2025, quarter: "Q3" },
  { year: 2025, quarter: "Q4" },
];

const EXPECTED_SIGNALS = 4;

const currentStep = ref(0);
const isPlaying = ref(false);
const totalLength = ref(443); // 预计算值，防 0 闪动
let waitingTimer = null;
let checkTimer = null;

// ── 刻度位置计算（二次贝塞尔 P0=(30,34) P1=(250,6) P2=(470,34)） ──
function computePositions() {
  const count = quarterSequence.length;
  const result = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const cx = 30 + 440 * t;
    const cy = 34 - 56 * t + 56 * t * t;
    const nx = 56 - 112 * t;
    const ny = 440;
    const nLen = Math.sqrt(nx * nx + ny * ny);
    const ux = nx / nLen;
    const uy = ny / nLen;
    result.push({
      cx, cy,
      x1: cx - 2 * ux, y1: cy - 2 * uy,
      x2: cx + 6 * ux, y2: cy + 6 * uy,
      lx: cx + 14 * ux, ly: cy + 14 * uy,
      label: String(quarterSequence[i].year).slice(2) + quarterSequence[i].quarter,
    });
  }
  return result;
}

const tickPositions = computed(() => computePositions());

// ── 弧长数值积分 ──
function arcLength(t) {
  const steps = 200;
  let len = 0;
  for (let i = 0; i < steps; i++) {
    const u = (i + 0.5) * t / steps;
    const dy = -56 + 112 * u;
    len += Math.sqrt(440 * 440 + dy * dy) * (t / steps);
  }
  return len;
}

const progressOffset = computed(() => {
  if (currentStep.value <= 0) return totalLength.value;
  const t = currentStep.value / (quarterSequence.length - 1);
  return totalLength.value - arcLength(t);
});

const currentLabel = computed(() => {
  const q = quarterSequence[currentStep.value];
  return q ? `${q.year} ${q.quarter}` : "";
});

// ── 等待所有 4 个数据源就绪（带超时保护） ──
function waitForData(callback) {
  clearTimeout(checkTimer);
  const TIMEOUT = 20000;
  const start = Date.now();
  let stableCount = -1;

  const check = () => {
    if (!isPlaying.value) return;
    const count = store.tracebackTickCount;

    if (count >= EXPECTED_SIGNALS && count === stableCount) {
      callback?.();
      return;
    }

    if (Date.now() - start > TIMEOUT) {
      // eslint-disable-next-line no-console
      console.warn('[Traceback] 信号超时，强制前进');
      callback?.();
      return;
    }

    stableCount = count >= EXPECTED_SIGNALS ? count : -1;
    checkTimer = setTimeout(check, 200);
  };
  checkTimer = setTimeout(check, 200);
}

// ── 前进到下一季度 ──
function stepForward() {
  if (currentStep.value >= quarterSequence.length - 1) {
    isPlaying.value = false;
    store.tracebackPlaying = false;
    return;
  }

  currentStep.value++;
  const q = quarterSequence[currentStep.value];
  store.tracebackResetTicks();
  store.setYear(q.year);
  store.setQuarter(q.quarter);

  clearTimeout(waitingTimer);
  waitForData(() => {
    waitingTimer = setTimeout(() => {
      if (isPlaying.value) stepForward();
    }, 500);
  });
}

// ── 从头开始播放 ──
function replay() {
  clearTimeout(waitingTimer);
  clearTimeout(checkTimer);
  currentStep.value = 0;
  isPlaying.value = true;
  store.tracebackPlaying = true;
  store.tracebackResetTicks();
  store.setYear(quarterSequence[0].year);
  store.setQuarter(quarterSequence[0].quarter);

  waitingTimer = setTimeout(() => {
    if (isPlaying.value) stepForward();
  }, 800);
}

// ── 暂停 / 继续 ──
function togglePlay() {
  if (isPlaying.value) {
    isPlaying.value = false;
    store.tracebackPlaying = false;
    clearTimeout(waitingTimer);
    clearTimeout(checkTimer);
  } else {
    isPlaying.value = true;
    store.tracebackPlaying = true;
    if (currentStep.value >= quarterSequence.length - 1) {
      replay();
    } else {
      stepForward();
    }
  }
}

// ── 进入/离开回溯模式 ──
watch(() => store.viewMode, (mode) => {
  if (mode === 'traceback') {
    replay();
  } else {
    isPlaying.value = false;
    store.tracebackPlaying = false;
    clearTimeout(waitingTimer);
    clearTimeout(checkTimer);
  }
});

onUnmounted(() => {
  store.tracebackPlaying = false;
  clearTimeout(waitingTimer);
  clearTimeout(checkTimer);
});
</script>

<style scoped>
.traceback-bar {
  position: absolute;
  bottom: 112px;
  left: 50%;
  transform: translateX(-50%);
  width: 620px;
  height: 44px;
  z-index: 130;
  pointer-events: none;
}

.traceback-bar svg {
  pointer-events: none;
}

.controls-overlay {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
  z-index: 2;
}

.ctrl-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 20, 32, 0.88);
  border: 1px solid rgba(59, 130, 246, 0.35);
  border-radius: 50%;
  color: #93c5fd;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.ctrl-btn:hover {
  background: rgba(30, 45, 80, 0.95);
  border-color: rgba(59, 130, 246, 0.6);
  color: #bfdbfe;
  transform: scale(1.1);
}

.ctrl-btn:disabled {
  opacity: 0.35;
  cursor: default;
  transform: none;
}

.ctrl-btn:disabled:hover {
  background: rgba(15, 20, 32, 0.88);
  border-color: rgba(59, 130, 246, 0.35);
  color: #93c5fd;
  transform: none;
}

.play-btn {
  width: 32px;
  height: 32px;
}

.quarter-label {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: rgba(147, 197, 253, 0.9);
  font-family: monospace;
  letter-spacing: 0.5px;
  pointer-events: none;
  background: rgba(15, 20, 32, 0.65);
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  z-index: 2;
}
</style>
