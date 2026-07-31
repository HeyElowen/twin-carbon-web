import request from "./request";

/**
 * 文档 API — 配合后端 DocumentController
 *
 * 提供文档的列表、预览、下载、删除能力。
 * Agent 通过 FC Tool 保存文档后，前端通过此 API 获取和展示。
 */

/**
 * 获取当前用户的文档列表。
 * GET /agent/documents
 * @param {string} [conversationId] 可选，用于对话隔离过滤
 * @returns {Promise<Array<{id, name, type, size, createdAt}>>}
 */
export function listDocuments(conversationId) {
  const params = conversationId ? `?conversationId=${conversationId}` : "";
  return request.get(`/agent/documents${params}`);
}

/**
 * 获取文档详情（含 Markdown 正文）。
 * GET /agent/documents/{docId}
 * @param {string} docId
 * @returns {Promise<{id, name, type, size, createdAt, content}>}
 */
export function getDocument(docId) {
  return request.get(`/agent/documents/${docId}`);
}

/**
 * 下载文档。
 * GET /agent/documents/{docId}/download
 * 返回 { blob, filename }，filename 从 Content-Disposition 头提取。
 * @param {string} docId
 * @returns {Promise<{blob: Blob, filename: string}>}
 */
export async function downloadDocument(docId) {
  const response = await request.get(`/agent/documents/${docId}/download`, {
    responseType: "blob",
  });
  // 现在 blob 请求返回完整 response（含 headers）
  const blob = response.data;
  const disposition = response.headers["content-disposition"] || "";
  // 解析 filename*=UTF-8''xxx 或 filename="xxx"
  let filename = `document.${docId}`;
  const starMatch = disposition.match(/filename\*=(?:UTF-8|UTF-8'')?([^;\s]+)/i);
  if (starMatch) {
    filename = decodeURIComponent(starMatch[1]);
  } else {
    const nameMatch = disposition.match(/filename="?([^";\s]+)"?/i);
    if (nameMatch) filename = nameMatch[1];
  }
  return { blob, filename };
}

/**
 * 删除文档。
 * DELETE /agent/documents/{docId}
 * @param {string} docId
 * @returns {Promise<{code, message}>}
 */
export function deleteDocument(docId) {
  return request.delete(`/agent/documents/${docId}`);
}

// ══════════════════════════════════════════
//  工作区数据 API
// ══════════════════════════════════════════

/**
 * 获取工作区数据集列表。
 * GET /agent/workspace/data?conversationId=xxx
 * @param {string} [conversationId]
 * @returns {Promise<Array<{name, type, size, rows, createdAt}>>}
 */
export function listWorkspaceData(conversationId) {
  const params = conversationId ? `?conversationId=${conversationId}` : "";
  return request.get(`/agent/workspace/data${params}`);
}

/**
 * 获取工作区某个数据集的预览内容。
 * GET /agent/workspace/data/{name}?conversationId=xxx
 * @param {string} name
 * @param {string} [conversationId]
 * @returns {Promise<{name, preview}>}
 */
export function previewWorkspaceData(name, conversationId) {
  const params = conversationId ? `?conversationId=${conversationId}` : "";
  return request.get(`/agent/workspace/data/${encodeURIComponent(name)}${params}`);
}
