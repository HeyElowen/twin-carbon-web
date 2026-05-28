<template>
  <div class="workflow-preview">
    <div class="workflow-empty">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14z"/>
        <path d="M7 12h2v5H7zm4-3h2v8h-2zm4-2h2v10h-2z" fill="#3b82f6"/>
      </svg>
      <div class="workflow-title">工作流预览</div>
      <div class="workflow-desc">AI Agent 工作流可视化预览将在后续版本中提供</div>
    </div>
  </div>
</template>

<style scoped>
.workflow-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.workflow-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(224, 230, 240, 0.3);
}

.workflow-title {
  font-size: 15px;
  font-weight: 600;
  color: rgba(224, 230, 240, 0.5);
}

.workflow-desc {
  font-size: 14px;
  color: rgba(224, 230, 240, 0.3);
  text-align: center;
  max-width: 220px;
  line-height: 1.5;
}
</style>
