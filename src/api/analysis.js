import request from "./request";

/**
 * 分层设色 — Jenks 自然断点分级（基于单位面积排放强度）
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 * @returns {Promise} { buildings: [{name, category, emission, intensity, level, lon, lat}], thresholds: {...} }
 */
export function getLayeredColoring(year, quarter) {
  return request.get("/analysis/layered-coloring", {
    params: { year, quarter },
  });
}

/**
 * 极值分析 — IQR 四分位距离群检测（基于单位面积排放强度）
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 * @returns {Promise} { outliers: [{..., intensity, type: 'SEVERE_HIGH'|...}], globalStats: {method:'iqr',...}, categoryStats: {..., q1, q3, iqr, ...} }
 */
export function getExtremeAnalysis(year, quarter) {
  return request.get("/analysis/extreme", {
    params: { year, quarter },
  });
}
