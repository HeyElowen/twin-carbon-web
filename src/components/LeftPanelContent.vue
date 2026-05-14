<template>
  <div>
    <!-- 年份/季度筛选 -->
    <div class="filter-group">
      <div class="filter-row">
        <el-select v-model="filterYear" size="small" style="width: 92px">
          <el-option v-for="y in years" :key="y" :label="y" :value="y" />
        </el-select>
        <el-select v-model="filterQuarter" size="small" style="width: 120px">
          <el-option v-for="q in quarters" :key="q" :label="q" :value="q" />
        </el-select>
      </div>
      <el-button type="primary" size="small" @click="$emit('confirm')" style="width:100%">
        确认
      </el-button>
    </div>

    <!-- 图显示模式 -->
    <el-segmented v-model="activeTab" :options="chartModes" class="chart-mode" />

    <!-- 图例 -->
    <div class="legend-title">图例</div>
    <div class="legend-list">
      <div class="legend-item" v-for="item in legendList" :key="item.label">
        <div class="legend-color" :style="{ background: item.color }"></div>
        <span class="legend-label">{{ item.label }}</span>
      </div>
    </div>



     <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      accept=".xlsx,.xls,.csv"
      :limit="1"
      class="data-upload"
      :class="{ 'has-file': fileList.length > 0 }"
    >
      <div v-if="fileList.length === 0" class="upload-trigger">
        <el-icon><Plus /></el-icon>
        <span class="upload-tip">Excel</span>
      </div>
      <template #file="{ file }">
        <div class="excel-card">
          <div class="excel-card-icon">
            <svg viewBox="0 0 48 48" width="28" height="28">
              <rect width="48" height="48" rx="8" fill="#217346"/>
              <text x="24" y="32" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">XLS</text>
            </svg>
          </div>
          <span class="excel-card-name">{{ file.name }}</span>
          <button class="excel-card-remove" title="移除文件" @click.prevent.stop="clearFile">
            <el-icon><Close /></el-icon>
          </button>
        </div>
      </template>
    </el-upload>

    <div class="btn-group">
      <el-button @click="$emit('preview')" size="small" style="flex:1">预览</el-button>
      <el-button type="warning" @click="$emit('save')" size="small" style="flex:1">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue'

defineProps({
  years: { type: Array, default: () => [] },
  quarters: { type: Array, default: () => [] },
  chartModes: { type: Array, default: () => [] },
  legendList: { type: Array, default: () => [] }
})

const filterYear = defineModel('filterYear', { default: '2025' })
const filterQuarter = defineModel('filterQuarter', { default: '第二季度' })
const activeTab = defineModel('activeTab', { default: 'bar' })
const fileList = defineModel('fileList', { default: () => [] })

const uploadRef = ref(null)

function clearFile() {
  fileList.value = []
}

defineEmits(['confirm', 'add-data', 'preview', 'save'])
</script>

<style scoped>
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-mode {
  display: flex;
  margin-bottom: 10px;
}

.legend-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 8px;
}

.legend-list {
  margin-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-color {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 8px;
  flex-shrink: 0;
}

.legend-label {
  font-size: 13px;
  color: #333;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.data-upload {
  margin-bottom: 10px;
}

.data-upload :deep(.el-upload--picture-card) {
  width: 80px;
  height: 80px;
}

.data-upload :deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: auto;
  height: auto;
  border: none;
  background: transparent;
}

.data-upload :deep(.el-upload-list--picture-card .el-upload-list__item-thumbnail) {
  display: none;
}

.upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.upload-tip {
  font-size: 11px;
  color: #888;
}

.excel-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(33, 115, 70, 0.08);
  border: 1px solid rgba(33, 115, 70, 0.2);
  border-radius: 6px;
  min-width: 0;
}

.excel-card-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.excel-card-name {
  font-size: 12px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.excel-card-remove {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #999;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.15s, color 0.15s;
}

.excel-card-remove:hover {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

/* 有文件时隐藏上传触发区 */
.data-upload.has-file :deep(.el-upload--picture-card) {
  display: none;
}
</style>
