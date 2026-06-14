import request from "./request";

/**
 * 获取建筑碳排放观测点数据（用于地图加载）
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 * @param {boolean} asFeatureCollection 是否返回 GeoJSON FeatureCollection 格式
 */
export function getBuildingObservationPoint(year, quarter, asFeatureCollection = false) {
  return request.get("/monitoring/building-observation-point", {
    params: { year, quarter, asFeatureCollection },
  });
}

/**
 * 获取饼图统计数据 — 用地类型碳排放占比
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 */
export function getCategoryRatio(year, quarter) {
  return request.get("/monitoring/statistics/building-category-ratio", {
    params: { year, quarter },
  });
}

/**
 * 获取趋势折线图数据
 * @param {number} yearStart 起始年份
 * @param {number} yearEnd 结束年份
 * @param {string} category 用地类型（空字符串表示全部）
 */
export function getTrend(yearStart, yearEnd, category) {
  return request.get("/monitoring/statistics/building-trend", {
    params: { yearStart, yearEnd, category: category || "" },
  });
}

/**
 * 获取各类用地排放强度统计
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 */
export function getCategoryIntensity(year, quarter) {
  return request.get("/monitoring/statistics/category-intensity", {
    params: { year, quarter },
  });
}

/**
 * 获取碳排放概览统计
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 */
export function getOverview(year, quarter) {
  return request.get("/monitoring/statistics/overview", {
    params: { year, quarter },
  });
}

/**
 * 按名称模糊查询建筑
 * @param {string} name 建筑名称
 * @param {number} year 年份
 * @param {string} quarter 季度
 */
export function getBuildingQuery(name, year, quarter) {
  return request.get("/monitoring/building-query", {
    params: { name, year, quarter },
  });
}

/**
 * 下载 Excel 导入模板
 * 返回 Blob，前端可直接创建下载链接
 */
export function downloadTemplate() {
  return request.get("/monitoring/template/download", {
    responseType: "blob",
  });
}

/**
 * 上传 Excel 文件进行导入预览
 * @param {File} file Excel 文件
 * @returns {Promise} { batchId, totalCount, validCount, invalidCount, features, errors }
 */
export function importExcel(file) {
  const formData = new FormData();
  formData.append("file", file);
  return request.post("/monitoring/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

/**
 * 确认导入 — 将预览数据写入数据库
 * @param {string} batchId 预览批次 ID
 */
export function confirmImport(batchId) {
  return request.post("/monitoring/import/confirm", { batchId });
}

/**
 * 预览饼图 — 按类别统计碳排放占比
 * @param {string} batchId 预览批次 ID
 * @param {number} year 年份
 * @param {string} quarter 季度
 * @returns {Promise} [{ name, value }]
 */
export function previewCategoryRatio(batchId, year, quarter) {
  return request.get("/monitoring/import/preview-statistics/category-ratio", {
    params: { batchId, year, quarter },
  });
}

/**
 * 预览趋势 — 按季度统计排放量
 * @param {string} batchId 预览批次 ID
 * @param {number} yearStart 起始年份
 * @param {number} [yearEnd] 结束年份（可选）
 * @param {string} category 用地类型
 * @returns {Promise} [{ name, value }]
 */
export function previewTrend(batchId, yearStart, yearEnd, category) {
  return request.get("/monitoring/import/preview-statistics/trend", {
    params: { batchId, yearStart, yearEnd, category },
  });
}

/**
 * 预览概览 — 预览数据全局统计
 * @param {string} batchId 预览批次 ID
 * @returns {Promise} { totalEmission, buildingCount, avgIntensity, trend }
 */
export function previewOverview(batchId) {
  return request.get("/monitoring/import/preview-statistics/overview", {
    params: { batchId },
  });
}

