<template>
  <div class="workspace-panel">
    <!-- 标签页 -->
    <div class="tab-bar">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab-btn"
        :class="{ active: activeTab === t.key }"
        @click="switchTab(t.key)"
      >
        <span class="tab-icon">{{ t.icon }}</span>
        {{ t.label }}
      </button>
    </div>

    <!-- ===== 通用空状态（无对话时） ===== -->
    <div v-if="!hasConversation" class="workspace-empty">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        <path d="M11 12h2v2h-2zm0-6h2v4h-2z" fill="#3b82f6"/>
      </svg>
      <div class="empty-title">开启对话后工作区自动出现</div>
      <div class="empty-desc">在 AI Agent 面板发送消息，生成的数据、文档和图表会出现在这里</div>
    </div>

    <!-- ===== 文档 Tab ===== -->
    <template v-if="activeTab === 'docs' && hasConversation">
      <!-- 文档列表 -->
      <div class="tab-content" v-if="!selectedDoc">
        <div class="panel-header">
          <div class="section-title">
            已保存文档
            <span class="count-badge">{{ docs.length }}</span>
          </div>
          <button class="icon-btn" @click="refreshDocs" title="刷新">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
        <div class="item-list">
          <div
            class="item-card"
            v-for="doc in docs"
            :key="doc.id"
            @click="selectDoc(doc)"
          >
            <div class="item-icon">{{ typeIcon(doc.type) }}</div>
            <div class="item-info">
              <div class="item-name">{{ doc.name }}</div>
              <div class="item-meta">
                <span class="type-badge" :class="doc.type">{{ typeLabel(doc.type) }}</span>
                <span>{{ formatSize(doc.size) }}</span>
                <span>{{ formatTime(doc.createdAt) }}</span>
              </div>
            </div>
            <button class="item-delete" @click.stop="confirmDelete(doc)" title="删除">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
          <div v-if="docs.length === 0" class="section-empty">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
            </svg>
            <div class="empty-hint">还没有保存的文档</div>
            <div class="empty-sub">让 AI Agent 帮你写一份文档，它会在完成后自动保存到这里</div>
          </div>
        </div>
      </div>

      <!-- 文档预览 -->
      <div class="preview-pane" v-if="selectedDoc">
        <div class="preview-topbar">
          <button class="back-btn" @click="selectedDoc = null">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            返回
          </button>
          <div class="preview-actions">
            <button class="act-btn down" @click="handleDownload(selectedDoc)">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              下载
            </button>
            <button class="act-btn del" @click="confirmDelete(selectedDoc)">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
              删除
            </button>
          </div>
        </div>
        <div class="preview-title">{{ selectedDoc.name }}</div>
        <div class="preview-meta-row">
          <span class="type-badge" :class="selectedDoc.type">{{ typeLabel(selectedDoc.type) }}</span>
          <span class="format-badge" :class="selectedDoc.format">{{ (selectedDoc.format || 'md').toUpperCase() }}</span>
          <span>{{ formatSize(selectedDoc.size) }}</span>
          <span>{{ formatTime(selectedDoc.createdAt) }}</span>
        </div>
        <div class="preview-body">
          <!-- Markdown 预览 -->
          <div v-if="!selectedDoc.format || selectedDoc.format === 'md'"
               class="markdown-body" v-html="renderMarkdown(previewContent)"></div>
          <!-- Word (.docx) 预览 -->
          <div v-else-if="selectedDoc.format === 'docx'" ref="docxPreviewEl" class="docx-body"></div>
          <!-- Excel (.xlsx) 预览 -->
          <div v-else-if="selectedDoc.format === 'xlsx'" class="xlsx-body" v-html="excelHtml"></div>
          <!-- 其他格式仅支持下载 -->
          <div v-else class="binary-preview-hint">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" opacity="0.3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
            </svg>
            <div class="hint-text">该格式不支持在线预览</div>
            <button class="hint-download-btn" @click="handleDownload(selectedDoc)">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              下载文件
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- ===== 数据 Tab ===== -->
    <template v-if="activeTab === 'data' && hasConversation">
      <div class="tab-content">
        <div class="panel-header">
          <div class="section-title">
            工作区数据
            <span class="count-badge">{{ wsEntries.length }}</span>
          </div>
          <button class="icon-btn" @click="refreshWorkspaceData" title="刷新">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
        <div class="item-list" v-if="!selectedWsEntry">
          <div
            class="item-card"
            v-for="entry in wsEntries"
            :key="entry.name"
            @click="selectWsEntry(entry)"
          >
            <div class="item-icon">{{ wsTypeIcon(entry.type) }}</div>
            <div class="item-info">
              <div class="item-name">{{ entry.name }}</div>
              <div class="item-meta">
                <span class="ws-type-badge">{{ entry.rows }}行</span>
                <span>{{ formatSize(entry.size) }}</span>
                <span>{{ entry.createdAt }}</span>
              </div>
            </div>
          </div>
          <div v-if="wsEntries.length === 0" class="section-empty">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.3">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              <path d="M7 12h2v5H7zm4-3h2v8h-4zm4-2h2v10h-2z" fill="#3b82f6"/>
            </svg>
            <div class="empty-hint">工作区暂无数据</div>
            <div class="empty-sub">AI Agent 分析数据时会自动保存到这里</div>
          </div>
        </div>
        <!-- 数据预览 -->
        <div class="preview-pane" v-if="selectedWsEntry">
          <div class="preview-topbar">
            <button class="back-btn" @click="selectedWsEntry = null">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              返回
            </button>
          </div>
          <div class="preview-title">{{ selectedWsEntry.name }}</div>
          <div class="preview-meta-row">
            <span class="ws-type-badge">{{ selectedWsEntry.rows }}行</span>
            <span>{{ formatSize(selectedWsEntry.size) }}</span>
            <span>{{ selectedWsEntry.createdAt }}</span>
          </div>
          <div class="preview-body">
            <pre class="ws-preview-text">{{ wsPreview }}</pre>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { renderAsync } from "docx-preview";
import * as XLSX from "xlsx";
import { useConfigStore } from "@/js/stores/useConfigStore";
import { listDocuments, getDocument, downloadDocument, deleteDocument, listWorkspaceData, previewWorkspaceData } from "@/api/document";

// ── Store ──
const store = useConfigStore();
const hasConversation = computed(() => !!store.currentConversationId);

// ── Tabs ──
const tabs = [
  { key: "docs",   label: "文档", icon: "📄" },
  { key: "data",   label: "数据", icon: "📊" },
];
const activeTab = ref("docs");

function switchTab(key) {
  activeTab.value = key;
}

// ── Markdown 渲染 ──
const renderer = new marked.Renderer();
renderer.link = ({ href, text }) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
marked.setOptions({ renderer, breaks: true, gfm: true });

function renderMarkdown(text) {
  if (!text) return "";
  return DOMPurify.sanitize(marked.parse(text));
}

// ── 文档状态 ──
const docs = ref([]);
const selectedDoc = ref(null);
const previewContent = ref("");
const docxPreviewEl = ref(null);   // Word 预览容器（docx-preview 渲染目标）
const excelHtml = ref("");          // Excel 预览 HTML（xlsx → table）

// ── 工作区数据状态 ──
const wsEntries = ref([]);
const selectedWsEntry = ref(null);
const wsPreview = ref("");

// ── 文档操作 ──
async function refreshDocs() {
  if (!store.currentConversationId) return;
  try {
    docs.value = await listDocuments(store.currentConversationId);
  } catch (e) {
    console.error("加载文档列表失败", e);
  }
}

async function selectDoc(doc) {
  if (selectedDoc.value?.id === doc.id) return;
  selectedDoc.value = doc;
  previewContent.value = "";
  excelHtml.value = "";
  const fmt = doc.format || "md";

  try {
    if (fmt === "md") {
      // Markdown：拉取正文用 marked 渲染
      const detail = await getDocument(doc.id);
      previewContent.value = detail.content || "";
    } else if (fmt === "docx") {
      // Word：下载 blob → docx-preview 渲染到容器
      const { blob } = await downloadDocument(doc.id);
      await nextTick();
      const container = docxPreviewEl.value;
      if (!container) return;
      container.innerHTML = ""; // 清空上一个文档
      await renderAsync(blob, container, undefined, {
        className: "docx-preview",
        inWrapper: true,
        ignoreWidth: true,
        ignoreHeight: true,
        breakPages: true,
      });
    } else if (fmt === "xlsx") {
      // Excel：下载 blob → xlsx 解析第一个 sheet → 渲染为 HTML 表格
      const { blob } = await downloadDocument(doc.id);
      const buf = await blob.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      // sheet_to_html 不转义单元格内容，用 DOMPurify 加固防 XSS
      excelHtml.value = sheet
        ? DOMPurify.sanitize(XLSX.utils.sheet_to_html(sheet, { id: "xlsx-preview-table" }))
        : "<p>该 Excel 没有可预览的内容</p>";
    }
  } catch (e) {
    console.error("加载文档内容失败", e);
    previewContent.value = "*文档内容加载失败*";
  }
}

async function handleDownload(doc) {
  try {
    const { blob, filename } = await downloadDocument(doc.id);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (e) {
    ElMessage.error("文档下载失败");
  }
}

async function confirmDelete(doc) {
  try {
    await ElMessageBox.confirm(
      `确定要删除「${doc.name}」吗？删除后不可恢复。`,
      "删除确认",
      { confirmButtonText: "删除", cancelButtonText: "取消", type: "warning" }
    );
    await deleteDocument(doc.id);
    docs.value = docs.value.filter(d => d.id !== doc.id);
    if (selectedDoc.value?.id === doc.id) {
      selectedDoc.value = null;
      previewContent.value = "";
    }
    ElMessage.success("已删除");
  } catch { /* cancel */ }
}

// ── 工作区数据操作 ──
async function refreshWorkspaceData() {
  if (!store.currentConversationId) return;
  try {
    wsEntries.value = await listWorkspaceData(store.currentConversationId);
  } catch (e) {
    console.error("加载工作区数据失败", e);
  }
}

async function selectWsEntry(entry) {
  if (selectedWsEntry.value?.name === entry.name) return;
  selectedWsEntry.value = entry;
  wsPreview.value = "";
  try {
    const detail = await previewWorkspaceData(entry.name, store.currentConversationId);
    wsPreview.value = detail.preview || "";
  } catch (e) {
    console.error("加载数据预览失败", e);
    wsPreview.value = "*数据加载失败*";
  }
}

function wsTypeIcon(type) {
  if (type?.includes("List") || type?.includes("ArrayList")) return "📋";
  if (type?.includes("Map") || type?.includes("HashMap")) return "🗂️";
  if (type?.includes("String")) return "📝";
  return "📊";
}

// ── 格式化 ──
function formatTime(isoStr) {
  if (!isoStr) return "";
  const d = new Date(isoStr);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0");
  if (diff === 1) return "昨天";
  if (diff < 7) return `${diff}天前`;
  return `${d.getMonth()+1}/${d.getDate()}`;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + "B";
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + "KB";
  return (bytes/(1024*1024)).toFixed(1) + "MB";
}

function typeIcon(t) {
  return t === "report" ? "📊" : t === "technical" ? "📘" : "📝";
}
function typeLabel(t) {
  return t === "report" ? "报告" : t === "technical" ? "技术" : "文章";
}

// ── 切换 tab 时按需加载 ──
watch(activeTab, (tab) => {
  if (!hasConversation.value) return;
  if (tab === "docs") refreshDocs();
  if (tab === "data") refreshWorkspaceData();
});

// ── 初始化 ──
onMounted(() => {
  if (hasConversation.value) {
    refreshDocs();
    refreshWorkspaceData();
  }
});
</script>

<style scoped>
.workspace-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  gap: 10px;
}

/* ── 标签栏 ── */
.tab-bar {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  background: rgba(15, 20, 32, 0.3);
  border-radius: 8px;
  padding: 3px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 8px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: rgba(224, 230, 240, 0.4);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: rgba(224, 230, 240, 0.7);
  background: rgba(59, 130, 246, 0.06);
}

.tab-btn.active {
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
}

.tab-icon {
  font-size: 15px;
}

/* ── 通用空状态 ── */
.workspace-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: rgba(224, 230, 240, 0.2);
  padding: 20px;
}

.empty-title {
  font-size: 15px;
  font-weight: 700;
  color: rgba(224, 230, 240, 0.4);
}

.empty-desc {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.2);
  text-align: center;
  line-height: 1.5;
  max-width: 200px;
}

/* ── Tab 内容区 ── */
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 8px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #e0e6f0;
  padding-left: 8px;
  border-left: 3px solid #3b82f6;
  display: flex;
  align-items: center;
  gap: 6px;
}

.count-badge {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.35);
  font-weight: 700;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  color: rgba(224, 230, 240, 0.35);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
}

/* ── 条目列表 ── */
.item-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  padding-right: 2px;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px;
  border-radius: 7px;
  cursor: pointer;
  background: rgba(15, 20, 32, 0.25);
  border: 1px solid rgba(59, 130, 246, 0.06);
  transition: all 0.2s ease;
}

.item-card:hover {
  background: rgba(15, 20, 32, 0.4);
  border-color: rgba(59, 130, 246, 0.12);
}

.item-icon {
  font-size: 18px;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(15, 20, 32, 0.4);
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 13px;
  font-weight: 700;
  color: #e0e6f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
  font-size: 11px;
  color: rgba(224, 230, 240, 0.3);
}

.type-badge {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 600;
  flex-shrink: 0;
}

.type-badge.report { background: rgba(52, 211, 153, 0.12); color: #34d399; }
.type-badge.technical { background: rgba(96, 165, 250, 0.12); color: #60a5fa; }
.type-badge.article { background: rgba(168, 85, 247, 0.12); color: #a855f7; }

.ws-type-badge {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 600;
  flex-shrink: 0;
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.format-badge {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}
.format-badge.md { background: rgba(52, 211, 153, 0.12); color: #34d399; }
.format-badge.docx { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
.format-badge.xlsx { background: rgba(139, 92, 246, 0.12); color: #a78bfa; }

.ws-preview-text {
  font-size: 11px;
  line-height: 1.5;
  color: rgba(224, 230, 240, 0.65);
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
  font-family: "Cascadia Code", "Fira Code", "Consolas", monospace;
}

.item-delete {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(224, 230, 240, 0.15);
  opacity: 0;
  transition: all 0.2s ease;
  cursor: pointer;
  background: transparent;
  border: none;
}

.item-card:hover .item-delete { opacity: 1; color: rgba(239, 68, 68, 0.4); }
.item-delete:hover { background: rgba(239, 68, 68, 0.1); color: #ef4444 !important; }

/* ── 区块空状态 ── */
.section-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(224, 230, 240, 0.15);
  padding: 20px;
}

.empty-hint {
  font-size: 14px;
  font-weight: 600;
  color: rgba(224, 230, 240, 0.3);
}

.empty-sub {
  font-size: 12px;
  color: rgba(224, 230, 240, 0.15);
  text-align: center;
  line-height: 1.5;
  max-width: 200px;
}

/* ── 预览面板 ── */
.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 6px;
}

.preview-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  border-radius: 5px;
  color: rgba(224, 230, 240, 0.45);
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.12);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
}

.preview-actions {
  display: flex;
  gap: 4px;
}

.act-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  background: transparent;
}

.act-btn.down { color: #60a5fa; background: rgba(96,165,250,0.06); }
.act-btn.down:hover { background: rgba(96,165,250,0.12); }
.act-btn.del { color: rgba(239,68,68,0.5); }
.act-btn.del:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.15); color: #ef4444; }

.preview-title {
  font-size: 14px;
  font-weight: 700;
  color: #e0e6f0;
  flex-shrink: 0;
}

.preview-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 11px;
  color: rgba(224, 230, 240, 0.3);
}

.preview-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  border-radius: 6px;
  background: rgba(15, 20, 32, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.06);
  min-height: 0;
}

/* ── Word (.docx) 预览 ── */
.docx-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  border-radius: 4px;
}

.docx-body .docx-preview {
  color: #1a1a1a;
}

.docx-body .docx-wrapper {
  background: #ffffff;
  padding: 10px;
}

.docx-body .docx-wrapper .docx-container {
  background: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* ── Excel (.xlsx) 预览 ── */
.xlsx-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ffffff;
  border-radius: 4px;
}

.xlsx-body table {
  border-collapse: collapse;
  font-size: 12px;
  color: #1a1a1a;
  min-width: 100%;
}

.xlsx-body td, .xlsx-body th {
  border: 1px solid #d0d0d0;
  padding: 4px 8px;
  white-space: nowrap;
}

.xlsx-body th {
  background: #f0f4fa;
  font-weight: 700;
}

.xlsx-body table tr:nth-child(even) td {
  background: #fafbfd;
}

.binary-preview-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 20px;
  color: rgba(224, 230, 240, 0.2);
}

.hint-text {
  font-size: 14px;
  font-weight: 600;
  color: rgba(224, 230, 240, 0.3);
}

.hint-download-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.2);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.hint-download-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.35);
}

/* ── Markdown ── */
.markdown-body {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(224, 230, 240, 0.82);
  word-break: break-word;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
  color: #e0e6f0;
  margin-top: 14px;
  margin-bottom: 6px;
  font-weight: 700;
}
.markdown-body h1 { font-size: 16px; border-bottom: 1px solid rgba(59,130,246,0.12); padding-bottom: 5px; }
.markdown-body h2 { font-size: 14px; }
.markdown-body h3 { font-size: 13px; }
.markdown-body p { margin: 5px 0; }
.markdown-body strong { color: #f0f4ff; }
.markdown-body code {
  background: rgba(59,130,246,0.08);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 12px;
  color: #93c5fd;
}
.markdown-body pre {
  background: rgba(15,20,32,0.5);
  padding: 8px;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid rgba(59,130,246,0.08);
}
.markdown-body pre code { background: none; padding: 0; color: #a8b8d8; }
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 6px 0;
  font-size: 12px;
}
.markdown-body th, .markdown-body td {
  border: 1px solid rgba(59,130,246,0.12);
  padding: 4px 8px;
  text-align: left;
}
.markdown-body th { background: rgba(59,130,246,0.06); color: #bfdbfe; font-weight: 700; }
.markdown-body td { color: rgba(224,230,240,0.75); }
.markdown-body ul, .markdown-body ol { padding-left: 18px; margin: 3px 0; }
.markdown-body li { margin: 2px 0; }
.markdown-body a { color: #60a5fa; text-decoration: none; }
.markdown-body a:hover { text-decoration: underline; }
.markdown-body blockquote {
  border-left: 3px solid rgba(59,130,246,0.25);
  padding-left: 10px;
  margin: 6px 0;
  color: rgba(224,230,240,0.55);
}
.markdown-body hr { border: none; border-top: 1px solid rgba(59,130,246,0.08); margin: 10px 0; }

/* ── 滚动条 ── */
.item-list::-webkit-scrollbar, .preview-body::-webkit-scrollbar { width: 4px; }
.item-list::-webkit-scrollbar-track, .preview-body::-webkit-scrollbar-track { background: transparent; }
.item-list::-webkit-scrollbar-thumb, .preview-body::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.25); border-radius: 3px; }
</style>
