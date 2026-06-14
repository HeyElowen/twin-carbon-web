import request from "./request";

/**
 * 分层设色 — 每栋建筑按排放量分 5 等
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 * @returns {Promise} { buildings: [{name, category, emission, level, lon, lat}], thresholds: {...} }
 */
export function getLayeredColoring(year, quarter) {
  return request.get("/analysis/layered-coloring", {
    params: { year, quarter },
  });
}

/**
 * 极值分析 — Z-Score 离群检测
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 * @returns {Promise} { outliers: [...], globalStats: {...}, categoryStats: {...} }
 */
export function getExtremeAnalysis(year, quarter) {
  return request.get("/analysis/extreme", {
    params: { year, quarter },
  });
}
