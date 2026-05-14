import { reactive } from 'vue'

// ── Module-level singleton state ──
const dockedPanels = reactive({ left: [], right: [] })
const expandedId = reactive({ left: null, right: null })
const panelRegistry = reactive({})

export function useDockStore() {
  function registerPanel(id, title) {
    panelRegistry[id] = { id, title }
  }

  function unregisterPanel(id) {
    delete panelRegistry[id]
  }

  function dockPanel(id, side) {
    undockPanel(id)
    const meta = panelRegistry[id] || { id, title: id }
    dockedPanels[side].push(meta)
    expandedId[side] = id
  }

  function undockPanel(id) {
    for (const side of ['left', 'right']) {
      const idx = dockedPanels[side].findIndex(p => p.id === id)
      if (idx !== -1) {
        dockedPanels[side].splice(idx, 1)
        if (expandedId[side] === id) {
          expandedId[side] = dockedPanels[side].length > 0
            ? dockedPanels[side][dockedPanels[side].length - 1].id
            : null
        }
        break
      }
    }
  }

  function toggleExpand(id, side) {
    expandedId[side] = expandedId[side] === id ? null : id
  }

  function isPanelDocked(id) {
    return dockedPanels.left.some(p => p.id === id) ||
           dockedPanels.right.some(p => p.id === id)
  }

  function isPanelExpanded(id, side) {
    return expandedId[side] === id
  }

  function getPanelSide(id) {
    if (dockedPanels.left.some(p => p.id === id)) return 'left'
    if (dockedPanels.right.some(p => p.id === id)) return 'right'
    return null
  }

  return {
    dockedPanels,
    expandedId,
    panelRegistry,
    registerPanel,
    unregisterPanel,
    dockPanel,
    undockPanel,
    toggleExpand,
    isPanelDocked,
    isPanelExpanded,
    getPanelSide
  }
}
