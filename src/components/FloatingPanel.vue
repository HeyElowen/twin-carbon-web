<template>
  <div
    class="floating-panel"
    :class="{
      'is-dragging': isDragging,
      'is-resizing': isResizing,
      'will-dock-left': willDockSide === 'left',
      'will-dock-right': willDockSide === 'right'
    }"
    :style="panelStyle"
    ref="panelRef"
    @pointerdown.prevent="onPointerDown"
  >
    <!-- 标题栏（拖拽手柄） -->
    <div class="panel-header" @pointerdown.stop="onHeaderPointerDown">
      <span class="panel-title">{{ title }}</span>
      <div class="header-actions">
        <slot name="header-extra"></slot>
        <button
          class="action-btn dock-btn"
          title="挂起到侧边"
          @click.stop="onDock"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        </button>
        <button
          class="action-btn collapse-btn"
          :title="isCollapsed ? '展开' : '折叠'"
          @click.stop="toggleCollapse"
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2"
            :style="{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 面板主体 -->
    <div class="panel-body" v-show="!isCollapsed">
      <slot></slot>
    </div>

    <!-- 右下角缩放手柄 -->
    <div
      class="resize-handle"
      @pointerdown.stop.prevent="onResizeStart"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.2">
        <line x1="8" y1="0" x2="8" y2="8" />
        <line x1="0" y1="8" x2="8" y2="8" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  width: { type: Number, default: 280 },
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },
  title: { type: String, default: '' },
  panelId: { type: String, default: '' },
  zIndex: { type: Number, default: 100 },
  minWidth: { type: Number, default: 220 },
  minHeight: { type: Number, default: 150 }
})

const emit = defineEmits(['dock', 'drag-end', 'collapse-change', 'dock-hint'])

const DOCK_THRESHOLD = 80

const panelRef = ref(null)
const isDragging = ref(false)
const isCollapsed = ref(false)
const isResizing = ref(false)
const willDockSide = ref(null)

// 浮动位置
const floatX = ref(props.initialX)
const floatY = ref(props.initialY)
// 当前尺寸
const panelWidth = ref(props.width)
const panelHeight = ref(null)
// 拖拽偏移
const dragOffset = { x: 0, y: 0 }
// 拖拽中临时 z-index
const dragZIndex = ref(props.zIndex)

const panelStyle = computed(() => {
  const style = {
    position: 'fixed',
    width: `${panelWidth.value}px`,
    zIndex: dragZIndex.value,
    left: `${floatX.value}px`,
    top: `${floatY.value}px`
  }
  if (panelHeight.value) {
    style.height = `${panelHeight.value}px`
  }
  return style
})

// 挂起：根据当前位置判断最近侧边
function onDock() {
  const side = floatX.value + panelWidth.value / 2 < window.innerWidth / 2 ? 'left' : 'right'
  emit('dock', { panelId: props.panelId, side })
}

// 折叠切换
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  emit('collapse-change', !isCollapsed.value)
}

// ── 边缘检测 ──
function checkDockHint(x) {
  let side = null
  if (x < DOCK_THRESHOLD) side = 'left'
  else if (x > window.innerWidth - panelWidth.value - DOCK_THRESHOLD) side = 'right'

  if (side !== willDockSide.value) {
    willDockSide.value = side
    emit('dock-hint', side)
  }
}

// ── 拖拽逻辑 ──
const onHeaderPointerDown = (e) => {
  startDrag(e)
}

const onPointerDown = () => {
  dragZIndex.value = props.zIndex + 100
}

const startDrag = (e) => {
  isDragging.value = true
  dragZIndex.value = props.zIndex + 200
  dragOffset.x = e.clientX - floatX.value
  dragOffset.y = e.clientY - floatY.value

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
  document.addEventListener('selectstart', preventSelect)
}

function preventSelect(e) {
  e.preventDefault()
}

const onPointerMove = (e) => {
  if (!isDragging.value) return

  let newX = e.clientX - dragOffset.x
  let newY = e.clientY - dragOffset.y

  const maxX = window.innerWidth - panelWidth.value
  const maxY = window.innerHeight - 40

  newX = Math.max(0, Math.min(newX, maxX))
  newY = Math.max(0, Math.min(newY, maxY))

  floatX.value = newX
  floatY.value = newY
  checkDockHint(newX)
}

const onPointerUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  dragZIndex.value = props.zIndex

  // 松手时若靠近边缘 → 自动挂起
  if (willDockSide.value) {
    emit('dock', { panelId: props.panelId, side: willDockSide.value })
    willDockSide.value = null
    emit('dock-hint', null)
  }

  emit('drag-end', { x: floatX.value, y: floatY.value })

  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('selectstart', preventSelect)
}
// ── 缩放逻辑 ──
let resizeStart = null

function onResizeStart(e) {
  isResizing.value = true
  dragZIndex.value = props.zIndex + 200

  const rect = panelRef.value.getBoundingClientRect()
  resizeStart = {
    x: e.clientX,
    y: e.clientY,
    w: rect.width,
    h: rect.height || rect.height || panelRef.value.offsetHeight
  }

  document.addEventListener('pointermove', onResizeMove)
  document.addEventListener('pointerup', onResizeEnd)
  document.addEventListener('selectstart', preventSelect)
}

function onResizeMove(e) {
  if (!isResizing.value) return
  const dw = e.clientX - resizeStart.x
  const dh = e.clientY - resizeStart.y
  panelWidth.value = Math.max(props.minWidth, resizeStart.w + dw)
  panelHeight.value = Math.max(props.minHeight, resizeStart.h + dh)
}

function onResizeEnd() {
  isResizing.value = false
  dragZIndex.value = props.zIndex
  resizeStart = null

  document.removeEventListener('pointermove', onResizeMove)
  document.removeEventListener('pointerup', onResizeEnd)
  document.removeEventListener('selectstart', preventSelect)
}

// ── 点击面板外部恢复 z-index ──
const onDocumentPointerDown = () => {
  dragZIndex.value = props.zIndex
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('selectstart', preventSelect)
  document.removeEventListener('pointermove', onResizeMove)
  document.removeEventListener('pointerup', onResizeEnd)
})
</script>

<style scoped>
.floating-panel {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  background: rgba(245, 247, 250, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(208, 213, 220, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.2s;
  user-select: none;
  position: relative;
}

.floating-panel.is-dragging {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  cursor: grabbing;
}

.floating-panel.is-resizing {
  cursor: nwse-resize;
}

/* ── 边缘吸附提示 ── */
.floating-panel.will-dock-left {
  border-left: 3px solid #409EFF;
  box-shadow: -4px 0 16px rgba(64, 158, 255, 0.25);
}

.floating-panel.will-dock-right {
  border-right: 3px solid #409EFF;
  box-shadow: 4px 0 16px rgba(64, 158, 255, 0.25);
}

/* 标题栏 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: rgba(58, 69, 86, 0.9);
  border-radius: 8px 8px 0 0;
  cursor: grab;
  flex-shrink: 0;
  min-height: 40px;
}

.floating-panel.is-dragging .panel-header {
  cursor: grabbing;
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  margin-left: 8px;
}

.action-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.dock-btn svg {
  transition: transform 0.2s;
}

.dock-btn:hover svg {
  transform: scale(1.15);
}

.collapse-btn svg {
  transition: transform 0.2s;
}

/* 面板主体 */
.panel-body {
  padding: 12px;
  overflow-y: auto;
  flex: 1;
}

.panel-body::-webkit-scrollbar {
  width: 4px;
}

.panel-body::-webkit-scrollbar-track {
  background: transparent;
}

.panel-body::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.panel-body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

/* ── 缩放手柄 ── */
.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 3px;
  color: rgba(0, 0, 0, 0.2);
  transition: color 0.15s;
  z-index: 1;
}

.resize-handle:hover {
  color: rgba(0, 0, 0, 0.4);
}
</style>
