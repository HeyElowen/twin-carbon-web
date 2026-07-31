/**
 * 分析 API — 分层设色、极值分析、建筑属性查询
 */
import request from "./request";

/**
 * 分层设色 — Jenks 自然断点分级（基于单位面积排放强度）
 * @param {number} year 年份
 * @param {string} quarter 季度 Q1/Q2/Q3/Q4/ALL
 * @returns {Promise} { buildings, thresholds }
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
 * @returns {Promise} { outliers, globalStats, categoryStats }
 */
export function getExtremeAnalysis(year, quarter) {
  return request.get("/analysis/extreme", {
    params: { year, quarter },
  });
}

/**
 * 按 SMID 查询建筑碳排放（当前未被组件调用，dashboard 用本地 features 替代）
 * @param {number} smid
 * @param {number} year
 * @param {string} quarter
 */
export function getBuildingBySmid(smid, year, quarter) {
  return request.get("/monitoring/building-by-smids", {
    params: { smid, year, quarter },
  });
}
