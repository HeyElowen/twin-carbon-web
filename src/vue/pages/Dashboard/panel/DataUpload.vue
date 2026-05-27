<template>
  <div class="upload-panel">
    <!-- 文件上传区域（无文件时显示） -->
    <div class="upload-section" v-if="!store.uploadFile">
      <div class="section-title">上传 Excel 数据</div>
      <el-upload
        ref="uploadRef"
        drag
        accept=".xlsx,.xls"
        :auto-upload="false"
        :limit="1"
        :on-change="onFileChange"
        :file-list="[]"
        class="upload-area"
      >
        <el-icon :size="36" color="#60a5fa"><UploadFilled /></el-icon>
        <div class="upload-text">
          将 Excel 文件拖拽到此处，或<span class="upload-link">点击选择文件</span>
        </div>
        <template #tip>
          <div class="upload-tip">仅支持 .xlsx / .xls 格式</div>
        </template>
      </el-upload>
    </div>

    <!-- 已选文件缩略卡片（有文件时显示，正方形布局） -->
    <div class="file-card" v-else>
      <button class="file-card-remove" @click="onFileRemove" title="清除文件">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"/>
        </svg>
      </button>
      <div class="file-icon">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
          <path d="M8 12h8v2H8zm0 4h5v2H8zm0-8h3v2H8z" fill="#34d399"/>
        </svg>
      </div>
      <div class="file-card-name">{{ store.uploadFile.name }}</div>
      <div class="file-card-size">{{ formatSize(store.uploadFile.size) }}</div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="action-section">
      <div class="section-title"></div>
      <div class="action-buttons">
        <el-button
          class="action-btn preview-btn"
          :disabled="!store.uploadFile"
          :type="store.uploadPreviewActive ? 'danger' : 'default'"
          @click="togglePreview"
        >
          <el-icon :size="14">
            <View v-if="!store.uploadPreviewActive" />
            <Close v-else />
          </el-icon>
          {{ store.uploadPreviewActive ? '取消预览' : '预览数据' }}
        </el-button>
        <el-button
          class="action-btn confirm-btn"
          :disabled="!store.uploadFile"
          type="primary"
          @click="handleConfirm"
        >
          <el-icon :size="14"><Upload /></el-icon>
          确认上传
        </el-button>
      </div>
    </div>

    <!-- 下载区域 -->
    <div class="download-section">
      <div class="section-title">下载数据模板</div>
      <div class="download-list">
        <div
          class="download-item"
          v-for="item in downloadTemplates"
          :key="item.name"
        >
          <div class="download-info">
            <el-icon :size="20" color="#34d399"><Download /></el-icon>
            <span class="template-name">{{ item.name }}</span>
            <span class="template-desc">{{ item.desc }}</span>
          </div>
          <el-button
            class="download-btn"
            size="small"
            :icon="Download"
            @click="handleDownload(item)"
          />
        </div>
      </div>
      <!-- Excel 填写指南 -->
      <div class="guide-link">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="#60a5fa">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <a href="#" @click.prevent="openGuide">Excel 填写指南</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { UploadFilled, View, Close, Upload, Download } from "@element-plus/icons-vue";
import { useConfigStore } from "@/js/stores/useConfigStore";

const store = useConfigStore();
const uploadRef = ref(null);

const downloadTemplates = [
  { name: "碳排放数据模板.xlsx", desc: "按区域填报碳排放量", url: "#" },
  { name: "能耗数据模板.xlsx", desc: "按月填报各类能耗", url: "#" },
  { name: "排放因子模板.xlsx", desc: "填写各品类排放因子系数", url: "#" },
];

function exitPreview() {
  store.setUploadPreview(false);
}

function onFileChange(file) {
  store.setUploadFile(file.raw);
}

function onFileRemove() {
  store.setUploadPreview(false);
  store.setUploadFile(null);
  uploadRef.value?.clearFiles();
}

function formatSize(bytes) {
  if (!bytes) return "";
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

function togglePreview() {
  store.setUploadPreview(!store.uploadPreviewActive);
}

function handleConfirm() {
  // TODO: 实现上传逻辑
  store.setUploadPreview(false);
  store.setUploadFile(null);
  uploadRef.value?.clearFiles();
}

function handleDownload(item) {
  // TODO: 实现文件下载
}

function openGuide() {
  // TODO: 打开 Excel 填写指南
}

// 离开数据上传面板时自动清除
watch(() => store.activeKey, (key) => {
  if (key !== 'bar') {
    store.setUploadPreview(false);
    store.setUploadFile(null);
    uploadRef.value?.clearFiles();
  }
});
</script>

<style scoped>
.upload-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  overflow: hidden;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #e0e6f0;
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  flex-shrink: 0;
}

/* ── 上传区域 ── */
.upload-section {
  flex-shrink: 0;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-area :deep(.el-upload-dragger) {
  width: 100%;
  aspect-ratio: 1;
  max-height: 260px;
  background: rgba(15, 20, 32, 0.5);
  border: 1.5px dashed rgba(59, 130, 246, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.upload-area :deep(.el-upload-dragger:hover) {
  border-color: rgba(59, 130, 246, 0.6);
  background: rgba(15, 20, 32, 0.7);
}

.upload-area :deep(.el-upload-dragger.is-dragover) {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.upload-text {
  font-size: 13px;
  color: rgba(224, 230, 240, 0.6);
  margin-top: 10px;
  line-height: 1.5;
}

.upload-link {
  color: #60a5fa;
  font-weight: 500;
}

.upload-tip {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.35);
  margin-top: 8px;
  text-align: center;
}

/* ── 文件缩略卡片（正方形居中） ── */
.file-card {
  position: relative;
  flex-shrink: 0;
  aspect-ratio: 1;
  max-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  background: rgba(15, 20, 32, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.25s ease;
}

.file-card:hover {
  border-color: rgba(59, 130, 246, 0.35);
  background: rgba(15, 20, 32, 0.65);
}

.file-card .file-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(52, 211, 153, 0.1);
  color: #34d399;
}

.file-card .file-card-name {
  max-width: 80%;
  font-size: 13px;
  font-weight: 600;
  color: #e0e6f0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-card .file-card-size {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.45);
  text-align: center;
}

.file-card-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.1);
  color: rgba(239, 68, 68, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.file-card-remove:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

/* ── 操作区域 ── */
.action-section {
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  height: 38px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.preview-btn {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #bfdbfe;
}

.preview-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
}

.confirm-btn {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border: none;
  color: #fff;
}

.confirm-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
}

/* ── 下载区域 ── */
.download-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.download-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  padding-right: 2px;
}

.download-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(15, 20, 32, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.2s ease;
}

.download-item:hover {
  background: rgba(15, 20, 32, 0.6);
  border-color: rgba(59, 130, 246, 0.25);
}

.download-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.template-name {
  font-size: 12px;
  font-weight: 500;
  color: #e0e6f0;
  white-space: nowrap;
}

.template-desc {
  font-size: 11px;
  color: rgba(224, 230, 240, 0.45);
  white-space: nowrap;
}

.download-btn {
  flex-shrink: 0;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.15);
  color: #34d399;
  border-radius: 6px;
}

.download-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #6ee7b7;
}

/* ── Excel 填写指南 ── */
.guide-link {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.2s ease;
}

.guide-link:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

.guide-link a {
  color: #60a5fa;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.guide-link a:hover {
  color: #93c5fd;
  text-decoration: underline;
}
</style>
