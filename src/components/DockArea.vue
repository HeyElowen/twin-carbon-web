<template>
  <div
    class="dock-area"
    :class="[`dock-${side}`, { 'has-expanded': hasExpanded, 'hint-active': hintActive }]"
  >
    <div class="dock-items" v-if="panels.length > 0">
      <div
        class="dock-item"
        v-for="panel in panels"
        :key="panel.id"
        :class="{ 'is-expanded': expandedId[side] === panel.id }"
      >
        <!-- Tab header -->
        <div class="dock-item-header" @pointerdown="onHeaderPointerDown($event, panel)">
          <span class="dock-item-title">{{ panel.title }}</span>
          <div class="dock-item-actions">
            <button
              class="dock-item-action dock-item-expand"
              :title="expandedId[side] === panel.id ? '折叠' : '展开'"
              @click.stop="onToggleExpand(panel.id)"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2"
                :style="{ transform: expandedId[side] === panel.id ? 'rotate(0deg)' : 'rotate(180deg)' }"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <button
              class="dock-item-action dock-item-undock"
              title="取消挂起"
              @click.stop="onUndock(panel.id)"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                <path d="M16 3h5v5" />
                <path d="M21 3L12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tab body -->
        <div class="dock-item-body" v-show="expandedId[side] === panel.id">
          <slot :name="panel.id" />
        </div>
      </div>
    </div>

    <div v-else class="dock-empty">
      <span>暂无挂起面板</span>
    </div>

    <!-- 四角装饰 -->
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDockStore } from '../composables/useDockStore'

const props = defineProps({
  side: {
    type: String,
    required: true,
    validator: v => ['left', 'right'].includes(v)
  },
  hintActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['undockDrag'])

const { dockedPanels, expandedId, undockPanel, toggleExpand } = useDockStore()

const panels = computed(() => dockedPanels[props.side])
const hasExpanded = computed(() => expandedId[props.side] !== null)

function onToggleExpand(id) {
  toggleExpand(id, props.side)
}

function onUndock(id) {
  undockPanel(id)
}

// ── 拖拽标题解除挂起 ──
function onHeaderPointerDown(e, panel) {
  if (e.button !== 0) return
  // 不拦截按钮点击
  if (e.target.closest('.dock-item-action') || e.target.closest('button')) return

  const startX = e.clientX
  const startY = e.clientY
  const DRAG_THRESHOLD = 10
  let torn = false

  function onMove(ev) {
    if (torn) return
    const dx = ev.clientX - startX
    const dy = ev.clientY - startY
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      torn = true
      undockPanel(panel.id)
      emit('undockDrag', { panelId: panel.id, x: ev.clientX, y: ev.clientY })
      cleanup()
    }
  }

  function onUp() {
    cleanup()
  }

  function cleanup() {
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', onUp)
    document.removeEventListener('selectstart', preventSelect)
  }

  function preventSelect(ev) { ev.preventDefault() }

  document.addEventListener('selectstart', preventSelect)
  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', onUp)
}
</script>

<style scoped>
.dock-area {
  position: fixed;
  top: 72px;
  bottom: 36px;
  z-index: 60;
  display: flex;
  flex-direction: column;
  width: 44px;
  transition: width 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
  pointer-events: auto;
}

.dock-left {
  left: 0;
}

.dock-right {
  right: 0;
}

.dock-area.has-expanded {
  width: 280px;
}

/* ── 边缘吸附提示高亮 ── */
.dock-area.hint-active {
  box-shadow: inset 0 0 28px rgba(114, 198, 195, 0.4);
  z-index: 65;
}

/* ── Items container ── */
.dock-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  overflow-y: auto;
  background: rgba(27, 46, 70, 0.4);
}

.dock-items::-webkit-scrollbar {
  width: 3px;
}

.dock-items::-webkit-scrollbar-track {
  background: transparent;
}

.dock-items::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.18);
  border-radius: 2px;
}

/* ── Each docked panel ── */
.dock-item {
  display: flex;
  flex-direction: column;
  background: rgba(32, 51, 71, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(73, 93, 104, 0.6);
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

/* 展开时撑满挂起区域高度 */
.dock-item.is-expanded {
  flex: 1;
  min-height: 0;
}

/* ── Header ── */
.dock-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  min-height: 40px;
  background: rgba(36, 53, 73, 0.75);
  flex-shrink: 0;
  cursor: grab;
  transition: background 0.15s;
  position: relative;
}

.dock-item-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 8px;
  right: 8px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(114,198,195,0.3), transparent);
}

.dock-item-title {
  font-size: 14px;
  font-weight: 600;
  color: #cbd5e1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  pointer-events: none;
}

/* Collapsed: vertical title */
.dock-area:not(.has-expanded) .dock-item-title {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 8px 0;
  font-size: 13px;
  letter-spacing: 2px;
}

/* ── Action buttons ── */
.dock-item-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.dock-item-action {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: rgba(148, 163, 184, 0.6);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.dock-item-action:hover {
  background: rgba(114, 198, 195, 0.15);
  color: #72C6C3;
}

/* Collapsed: header stacks vertically, expand button stays visible */
.dock-area:not(.has-expanded) .dock-item-header {
  flex-direction: column;
  align-items: center;
  padding: 6px 4px;
}

.dock-area:not(.has-expanded) .dock-item-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.dock-area:not(.has-expanded) .dock-item-undock {
  display: none;
}

/* ── Body ── */
.dock-item-body {
  padding: 12px;
  overflow-y: auto;
  flex: 1;
}

.dock-item-body::-webkit-scrollbar {
  width: 4px;
}

.dock-item-body::-webkit-scrollbar-track {
  background: transparent;
}

.dock-item-body::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.2);
  border-radius: 2px;
}

.dock-item-body::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.35);
}

/* ── 四角装饰 ── */
.corner {
  position: absolute;
  width: 8px;
  height: 8px;
  pointer-events: none;
  z-index: 2;
}
.corner-tl {
  top: 0; left: 0;
  border-top: 2px solid rgba(114,198,195,0.4);
  border-left: 2px solid rgba(114,198,195,0.4);
}
.corner-tr {
  top: 0; right: 0;
  border-top: 2px solid rgba(114,198,195,0.4);
  border-right: 2px solid rgba(114,198,195,0.4);
}
.corner-bl {
  bottom: 0; left: 0;
  border-bottom: 2px solid rgba(114,198,195,0.4);
  border-left: 2px solid rgba(114,198,195,0.4);
}
.corner-br {
  bottom: 0; right: 0;
  border-bottom: 2px solid rgba(114,198,195,0.4);
  border-right: 2px solid rgba(114,198,195,0.4);
}

/* ── Empty state ── */
.dock-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(148, 163, 184, 0.2);
  font-size: 11px;
  writing-mode: vertical-rl;
  padding: 12px 0;
}
</style>
