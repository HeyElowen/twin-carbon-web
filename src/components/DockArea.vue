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
  bottom: 40px;
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
  box-shadow: inset 0 0 24px rgba(64, 158, 255, 0.35);
  z-index: 65;
}

/* ── Items container ── */
.dock-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  overflow-y: auto;
  background: rgba(245, 247, 250, 0.5);
}

.dock-items::-webkit-scrollbar {
  width: 3px;
}

.dock-items::-webkit-scrollbar-track {
  background: transparent;
}

.dock-items::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}

/* ── Each docked panel ── */
.dock-item {
  display: flex;
  flex-direction: column;
  background: rgba(245, 247, 250, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(208, 213, 220, 0.6);
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

/* ── Header ── */
.dock-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  min-height: 40px;
  background: rgba(58, 69, 86, 0.85);
  flex-shrink: 0;
  cursor: grab;
  transition: background 0.15s;
}

.dock-item-title {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
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
  font-size: 11px;
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
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.dock-item-action:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
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
  max-height: 400px;
}

.dock-item-body::-webkit-scrollbar {
  width: 4px;
}

.dock-item-body::-webkit-scrollbar-track {
  background: transparent;
}

.dock-item-body::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.dock-item-body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

/* ── Empty state ── */
.dock-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(0, 0, 0, 0.25);
  font-size: 11px;
  writing-mode: vertical-rl;
  padding: 12px 0;
}
</style>
