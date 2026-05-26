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
