<template>
  <div>
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

    <!-- Excel 上传 -->
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
      <el-button @click="onPreview" size="small" style="flex:1">预览</el-button>
      <el-button type="warning" @click="onSave" size="small" style="flex:1">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { usePanelFilterStore } from '@/stores/panelFilter'
import { useMapDataStore } from '@/stores/mapData'
import {
  previewImport,
  confirmImport
} from '@/api/index.js'

const props = defineProps({
  chartModes: { type: Array, default: () => [] },
  legendList: { type: Array, default: () => [] }
})

const activeTab = defineModel('activeTab', { default: 'bar' })
const fileList = defineModel('fileList', { default: () => [] })

const uploadRef = ref(null)
const previewData = ref(null)
const filterStore = usePanelFilterStore()
const mapStore = useMapDataStore()

function clearFile() {
  fileList.value = []
}

// ── Excel 预览 ──
const onPreview = async () => {
  const file = fileList.value[0]
  if (!file) {
    ElMessage.warning('请先选择文件')
    return
  }
  const formData = new FormData()
  formData.append('file', file.raw || file)
  try {
    const res = await previewImport(formData)
    if (res.code === 200) {
      previewData.value = res.data
      console.log('【预览数据】', previewData.value)
      ElMessage.success('预览成功')
    } else {
      previewData.value = null
      ElMessage.warning(res.message || '预览未返回有效数据')
    }
  } catch (err) {
    previewData.value = null
    ElMessage.error('预览失败')
  }
}

// ── Excel 保存 ──
const onSave = async () => {
  const file = fileList.value[0]
  if (!file) {
    ElMessage.warning('请先选择文件')
    return
  }
  try {
    const formData = new FormData()
    formData.append('file', file.raw || file)
    const res = await previewImport(formData)
    if (res.code === 200 && res.data?.batchId) {
      await confirmImport({ batchId: res.data.batchId })
      ElMessage.success('保存成功')
      fileList.value = []
      previewData.value = null
      // 触发全局刷新
      filterStore.confirm()
    } else {
      ElMessage.warning(res.message || '预览未返回有效批次号，无法保存')
    }
  } catch (err) {
    ElMessage.error('保存失败')
  }
}
</script>

<style scoped>
.chart-mode {
  display: flex;
  margin-bottom: 10px;
}

.legend-title {
  font-size: 15px;
  font-weight: 600;
  color: #cbd5e1;
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
  font-size: 15px;
  color: #6D88A3;
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
  font-size: 13px;
  color: #6D88A3;
}

.excel-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(114, 198, 195, 0.08);
  border: 1px solid rgba(114, 198, 195, 0.2);
  border-radius: 6px;
  min-width: 0;
}

.excel-card-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.excel-card-name {
  font-size: 14px;
  color: #cbd5e1;
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
  color: #6D88A3;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.15s, color 0.15s;
}

.excel-card-remove:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

/* 有文件时隐藏上传触发区 */
.data-upload.has-file :deep(.el-upload--picture-card) {
  display: none;
}
</style>
