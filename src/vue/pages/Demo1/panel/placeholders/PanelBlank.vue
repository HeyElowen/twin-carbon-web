<template>
  <div class="panel-blank">
    <el-empty :description="title">
      <template #image>
        <div class="blank-skeleton">
          <el-skeleton :rows="3" animated />
        </div>
      </template>
      <template #description>
        <div class="blank-desc">
          <div class="blank-title">{{ title }}</div>
          <div class="blank-subtitle">{{ subtitle }}</div>
        </div>
      </template>
    </el-empty>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
});
</script>

<style scoped>
.panel-blank {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.panel-blank :deep(.el-empty) {
  padding: 0;
}

.panel-blank :deep(.el-empty__description) {
  margin-top: 12px;
}

.blank-skeleton {
  width: 120px;
  padding: 16px;
  background: rgba(15, 20, 32, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 8px;
}

.blank-desc {
  text-align: center;
}

.blank-title {
  font-size: 16px;
  font-weight: 600;
  color: #e0e6f0;
  margin-bottom: 4px;
}

.blank-subtitle {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.45);
  letter-spacing: 2px;
}
</style>
