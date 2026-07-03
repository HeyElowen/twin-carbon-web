/**
 * Mock 数据文件
 * 前端开发时，通过 request.js 中 USE_MOCK = true 启用
 *
 * 所有坐标以 无锡学院（120.47, 31.58）为中心，覆盖锡东新城区域
 *
 * 接口状态说明：
 *   ✅ 已实现 — 后端代码已存在，Mock 路径已对准真实接口
 *   🚧 待实现 — 后端代码尚未开发，仅做预留
 */

// ==================== 1. 登录 ✅ ====================
export const mockLogin = {
  code: 200,
  message: "success",
  data: {
    token: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    username: "admin",
    config: {
      sceneUrl: "http://localhost:8090/iserver/services/3D-test/rest/realspace"
    }
  }
}

// ==================== 2. 建筑碳排放数据点（GeoJSON FeatureCollection）✅ ====================
// 坐标以无锡学院（120.47, 31.58）为中心，覆盖锡东新城周边
const buildingPointsRaw = [
  // ── 住宅区（8个） ──
  { id: 1,  name: "水岸佳苑A区",     category: "住宅区", emission: 8.25, year: 2025, quarter: "Q3", lon: 120.458, lat: 31.572 },
  { id: 2,  name: "水岸佳苑B区",     category: "住宅区", emission: 12.36, year: 2025, quarter: "Q3", lon: 120.461, lat: 31.575 },
  { id: 3,  name: "山河九里",         category: "住宅区", emission: 18.92, year: 2025, quarter: "Q3", lon: 120.468, lat: 31.569 },
  { id: 4,  name: "恒大翡翠湾",       category: "住宅区", emission: 15.47, year: 2025, quarter: "Q3", lon: 120.475, lat: 31.576 },
  { id: 5,  name: "融创·东方府",      category: "住宅区", emission: 22.18, year: 2025, quarter: "Q3", lon: 120.452, lat: 31.582 },
  { id: 6,  name: "龙湖·九里香醍",    category: "住宅区", emission: 9.63,  year: 2025, quarter: "Q3", lon: 120.482, lat: 31.579 },
  { id: 7,  name: "碧桂园·南光城",    category: "住宅区", emission: 14.50, year: 2025, quarter: "Q3", lon: 120.445, lat: 31.585 },
  { id: 8,  name: "华润·江南府",      category: "住宅区", emission: 11.04, year: 2025, quarter: "Q3", lon: 120.478, lat: 31.568 },

  // ── 商业区（6个） ──
  { id: 9,  name: "锡东八佰伴",        category: "商业区", emission: 45.20, year: 2025, quarter: "Q3", lon: 120.476, lat: 31.590 },
  { id: 10, name: "红豆万花城",        category: "商业区", emission: 38.65, year: 2025, quarter: "Q3", lon: 120.469, lat: 31.587 },
  { id: 11, name: "映月天地商业街",    category: "商业区", emission: 22.30, year: 2025, quarter: "Q3", lon: 120.483, lat: 31.588 },
  { id: 12, name: "创融大厦B座",       category: "商业区", emission: 18.75, year: 2025, quarter: "Q3", lon: 120.472, lat: 31.584 },
  { id: 13, name: "锡东科技大厦",      category: "商业区", emission: 28.40, year: 2025, quarter: "Q3", lon: 120.479, lat: 31.582 },
  { id: 14, name: "浙大网新科创园",    category: "商业区", emission: 32.15, year: 2025, quarter: "Q3", lon: 120.464, lat: 31.579 },

  // ── 工业区（4个） ──
  { id: 15, name: "锡山经济技术开发区A区", category: "工业区", emission: 86.50, year: 2025, quarter: "Q3", lon: 120.438, lat: 31.565 },
  { id: 16, name: "锡山经济技术开发区B区", category: "工业区", emission: 72.30, year: 2025, quarter: "Q3", lon: 120.443, lat: 31.560 },
  { id: 17, name: "联东U谷",              category: "工业区", emission: 55.80, year: 2025, quarter: "Q3", lon: 120.450, lat: 31.562 },
  { id: 18, name: "精密机械产业园",        category: "工业区", emission: 45.20, year: 2025, quarter: "Q3", lon: 120.455, lat: 31.558 },

  // ── 农业区（4个） ──
  { id: 19, name: "锡山现代农业园",      category: "农业区", emission: 6.80,  year: 2025, quarter: "Q3", lon: 120.490, lat: 31.592 },
  { id: 20, name: "太湖水稻示范园",      category: "农业区", emission: 5.25,  year: 2025, quarter: "Q3", lon: 120.498, lat: 31.588 },
  { id: 21, name: "严家桥生态农场",      category: "农业区", emission: 3.90,  year: 2025, quarter: "Q3", lon: 120.485, lat: 31.595 },
  { id: 22, name: "羊尖镇绿色农业园",    category: "农业区", emission: 4.50,  year: 2025, quarter: "Q3", lon: 120.505, lat: 31.590 },

  // ── 教育区（6个，全部为无锡学院建筑） ──
  { id: 23, name: "无锡学院-教学楼",          category: "教育区", emission: 12.60, year: 2025, quarter: "Q3", lon: 120.468, lat: 31.583 },
  { id: 24, name: "无锡学院-图书馆",          category: "教育区", emission: 8.35,  year: 2025, quarter: "Q3", lon: 120.472, lat: 31.581 },
  { id: 25, name: "无锡学院-实验楼",          category: "教育区", emission: 15.80, year: 2025, quarter: "Q3", lon: 120.475, lat: 31.585 },
  { id: 26, name: "无锡学院-学生活动中心",     category: "教育区", emission: 5.60,  year: 2025, quarter: "Q3", lon: 120.470, lat: 31.586 },
  { id: 27, name: "无锡学院-体育馆",          category: "教育区", emission: 10.20, year: 2025, quarter: "Q3", lon: 120.465, lat: 31.580 },
  { id: 28, name: "无锡学院-学生食堂",         category: "教育区", emission: 6.75,  year: 2025, quarter: "Q3", lon: 120.473, lat: 31.588 },
]

function toFeatureCollection(points) {
  return {
    code: 200,
    message: "success",
    data: {
      type: "FeatureCollection",
      features: points.map((p) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [p.lon, p.lat]
        },
        properties: {
          id: p.id,
          name: p.name,
          category: p.category,
          emission: p.emission,
          year: p.year,
          quarter: p.quarter,
          createTime: p.createTime || "2026-05-24T17:31:14.754446",
          lon: p.lon,
          lat: p.lat
        }
      }))
    }
  }
}

export const mockBuildingPoints = toFeatureCollection(buildingPointsRaw)

// ==================== 4. 饼图统计 — 主数据 ✅ ====================
export const mockCategoryRatio = {
  code: 200,
  message: "success",
  data: [
    { name: "工业区", value: 259.80 },
    { name: "商业区", value: 185.45 },
    { name: "住宅区", value: 112.35 },
    { name: "教育区", value: 59.30 },
    { name: "农业区", value: 20.45 }
  ]
}

// ==================== 5. 饼图统计 — 建筑数据 ✅ ====================
export const mockBuildingCategoryRatio = {
  code: 200,
  message: "success",
  data: [
    { name: "工业区", value: 259.80 },
    { name: "农业区", value: 20.45 }
  ]
}

// ==================== 6. 趋势折线图 — 主数据（全部类型）✅ ====================
export const mockTrendAll = {
  code: 200,
  message: "success",
  data: [
    { name: "2022-Q1", value: 385.20 },
    { name: "2022-Q2", value: 402.50 },
    { name: "2022-Q3", value: 418.60 },
    { name: "2022-Q4", value: 435.30 },
    { name: "2023-Q1", value: 445.80 },
    { name: "2023-Q2", value: 462.40 },
    { name: "2023-Q3", value: 478.20 },
    { name: "2023-Q4", value: 495.00 },
    { name: "2024-Q1", value: 488.50 },
    { name: "2024-Q2", value: 512.30 },
    { name: "2024-Q3", value: 528.60 },
    { name: "2024-Q4", value: 545.20 },
    { name: "2025-Q1", value: 535.80 },
    { name: "2025-Q2", value: 558.50 },
    { name: "2025-Q3", value: 575.30 }
  ]
}

// ==================== 6. 趋势折线图 — 工业区 ✅ ====================
export const mockTrendIndustry = {
  code: 200,
  message: "success",
  data: [
    { name: "2022-Q1", value: 165.50 },
    { name: "2022-Q2", value: 172.80 },
    { name: "2022-Q3", value: 181.20 },
    { name: "2022-Q4", value: 188.60 },
    { name: "2023-Q1", value: 182.30 },
    { name: "2023-Q2", value: 198.50 },
    { name: "2023-Q3", value: 205.80 },
    { name: "2023-Q4", value: 212.20 },
    { name: "2024-Q1", value: 208.60 },
    { name: "2024-Q2", value: 225.30 },
    { name: "2024-Q3", value: 232.80 },
    { name: "2024-Q4", value: 241.50 },
    { name: "2025-Q1", value: 235.20 },
    { name: "2025-Q2", value: 248.60 },
    { name: "2025-Q3", value: 255.30 }
  ]
}

// ==================== 7. 趋势折线图 — 建筑数据 ✅ ====================
export const mockBuildingTrend = {
  code: 200,
  message: "success",
  data: [
    { name: "2022-Q1", value: 3200.5 },
    { name: "2022-Q2", value: 3500.8 },
    { name: "2022-Q3", value: 3800.2 },
    { name: "2022-Q4", value: 4100.6 }
  ]
}

// ==================== 8. 对象查询 ✅ ====================
export const mockQuery = {
  code: 200,
  message: "success",
  data: [
    {
      id: 9,
      name: "锡东八佰伴",
      category: "商业区",
      area: 32000.0,
      emission: 45.20,
      height: 45.0,
      year: 2025,
      quarter: "Q3",
      lon: 120.476,
      lat: 31.590,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 12,
      name: "创融大厦B座",
      category: "商业区",
      area: 28000.0,
      emission: 18.75,
      height: 38.0,
      year: 2025,
      quarter: "Q3",
      lon: 120.472,
      lat: 31.584,
      createTime: "2025-01-15T08:30:00"
    }
  ]
}

// ==================== 9. Excel 上传预览 — 成功 ✅ ====================
export const mockImportSuccess = {
  code: 200,
  message: "success",
  data: {
    batchId: "preview-batch-mock-2025",
    totalCount: 28,
    validCount: 28,
    invalidCount: 0,
    rawDataList: [],
    errors: [],
    features: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [120.458, 31.572] },
          properties: { name: "水岸佳苑A区", category: "住宅区", emission: 8.25, year: 2025, quarter: "Q3" }
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [120.468, 31.583] },
          properties: { name: "无锡学院-教学楼", category: "教育区", emission: 12.60 }
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [120.476, 31.590] },
          properties: { name: "锡东八佰伴", category: "商业区", emission: 45.20 }
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [120.438, 31.565] },
          properties: { name: "锡山经济技术开发区A区", category: "工业区", emission: 86.50 }
        },
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [120.490, 31.592] },
          properties: { name: "锡山现代农业园", category: "农业区", emission: 6.80 }
        }
      ]
    }
  }
}

// ==================== 9. Excel 上传预览 — 有错误 ✅ ====================
export const mockImportError = {
  code: 200,
  message: "success",
  data: {
    batchId: "preview-batch-mock-error-2025",
    totalCount: 28,
    validCount: 25,
    invalidCount: 3,
    rawDataList: [],
    errors: [
      { row: 5, field: "面积", message: "建筑面积必须大于0" },
      { row: 8, field: "经度", message: "经度超出合理范围" },
      { row: 12, field: "季度", message: "季度只能为 Q1/Q2/Q3/Q4" }
    ],
    features: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [120.468, 31.583] },
          properties: { name: "无锡学院-教学楼", category: "教育区", emission: 12.60 }
        }
      ]
    }
  }
}

// ==================== 10. 确认入库 ✅ ====================
export const mockConfirm = {
  code: 200,
  message: "success",
  data: null
}

// ==================== 401 未登录 ====================
export const mock401 = {
  code: 401,
  message: "未登录或登录已过期",
  data: null
}

// ==================== 500 业务错误 ====================
export const mock500 = {
  code: 500,
  message: "用户名或密码错误",
  data: null
}

// ==================== 11. 各类用地排放强度 ✅ ====================
export const mockCategoryIntensity = {
  code: 200,
  message: "success",
  data: [
    { name: "工业区", value: 36.21 },
    { name: "商业区", value: 21.45 },
    { name: "住宅区", value: 6.82 },
    { name: "教育区", value: 9.15 },
    { name: "农业区", value: 1.52 }
  ]
}

// ==================== 12. 碳排放概览 ✅ ====================
export const mockOverview = {
  code: 200,
  message: "success",
  data: {
    totalEmission: 575.30,
    buildingCount: 28,
    avgIntensity: 15.03,
    yoyChange: -5.2,
    trend: [
      { name: "2023-Q4", value: 495.00 },
      { name: "2024-Q1", value: 488.50 },
      { name: "2024-Q2", value: 512.30 },
      { name: "2024-Q3", value: 528.60 },
      { name: "2024-Q4", value: 545.20 },
      { name: "2025-Q1", value: 535.80 },
      { name: "2025-Q2", value: 558.50 },
      { name: "2025-Q3", value: 575.30 }
    ]
  }
}

// ==================== 13. 预览饼图统计 — 预览数据 ✅ ====================
export const mockPreviewCategoryRatio = {
  code: 200,
  message: "success",
  data: [
    { name: "工业区", value: 259.80 },
    { name: "商业区", value: 185.45 },
    { name: "住宅区", value: 112.35 },
    { name: "教育区", value: 59.30 },
    { name: "农业区", value: 20.45 }
  ]
}

// ==================== 14. 预览趋势统计 — 预览数据 ✅ ====================
export const mockPreviewTrend = {
  code: 200,
  message: "success",
  data: [
    { name: "2024-Q1", value: 488.50 },
    { name: "2024-Q2", value: 512.30 },
    { name: "2024-Q3", value: 528.60 },
    { name: "2024-Q4", value: 545.20 },
    { name: "2025-Q1", value: 535.80 },
    { name: "2025-Q2", value: 558.50 },
    { name: "2025-Q3", value: 575.30 }
  ]
}

// ==================== 15. 预览概览统计 — 预览数据 ✅ ====================
export const mockPreviewOverview = {
  code: 200,
  message: "success",
  data: {
    totalEmission: 575.30,
    buildingCount: 28,
    avgIntensity: 15.03,
    trend: [
      { name: "2024-Q1", value: 488.50 },
      { name: "2024-Q2", value: 512.30 },
      { name: "2024-Q3", value: 528.60 },
      { name: "2024-Q4", value: 545.20 },
      { name: "2025-Q1", value: 535.80 },
      { name: "2025-Q2", value: 558.50 },
      { name: "2025-Q3", value: 575.30 }
    ]
  }
}

// ==================== 16. 分层设色 🚧 ====================
export const mockLayeredColoring = {
  code: 200,
  message: "success",
  data: {
    thresholds: {
      "住宅区": { min: 8.25, max: 22.18, levels: [11.04, 13.82, 16.61, 19.39, 22.18] },
      "商业区": { min: 18.75, max: 45.20, levels: [24.04, 29.33, 34.62, 39.91, 45.20] },
      "工业区": { min: 45.20, max: 86.50, levels: [53.46, 61.72, 69.98, 78.24, 86.50] },
      "农业区": { min: 3.90, max: 6.80, levels: [4.48, 5.06, 5.64, 6.22, 6.80] },
      "教育区": { min: 5.60, max: 15.80, levels: [7.64, 9.68, 11.72, 13.76, 15.80] }
    },
    buildings: [
      { name: "水岸佳苑A区",     category: "住宅区", emission: 8.25,  level: 1, lon: 120.458, lat: 31.572 },
      { name: "水岸佳苑B区",     category: "住宅区", emission: 12.36, level: 2, lon: 120.461, lat: 31.575 },
      { name: "山河九里",         category: "住宅区", emission: 18.92, level: 4, lon: 120.468, lat: 31.569 },
      { name: "恒大翡翠湾",       category: "住宅区", emission: 15.47, level: 3, lon: 120.475, lat: 31.576 },
      { name: "融创·东方府",      category: "住宅区", emission: 22.18, level: 5, lon: 120.452, lat: 31.582 },
      { name: "龙湖·九里香醍",    category: "住宅区", emission: 9.63,  level: 1, lon: 120.482, lat: 31.579 },
      { name: "碧桂园·南光城",    category: "住宅区", emission: 14.50, level: 3, lon: 120.445, lat: 31.585 },
      { name: "华润·江南府",      category: "住宅区", emission: 11.04, level: 2, lon: 120.478, lat: 31.568 },
      { name: "锡东八佰伴",        category: "商业区", emission: 45.20, level: 5, lon: 120.476, lat: 31.590 },
      { name: "红豆万花城",        category: "商业区", emission: 38.65, level: 4, lon: 120.469, lat: 31.587 },
      { name: "映月天地商业街",    category: "商业区", emission: 22.30, level: 2, lon: 120.483, lat: 31.588 },
      { name: "创融大厦B座",       category: "商业区", emission: 18.75, level: 1, lon: 120.472, lat: 31.584 },
      { name: "锡东科技大厦",      category: "商业区", emission: 28.40, level: 3, lon: 120.479, lat: 31.582 },
      { name: "浙大网新科创园",    category: "商业区", emission: 32.15, level: 3, lon: 120.464, lat: 31.579 },
      { name: "锡山经济技术开发区A区", category: "工业区", emission: 86.50, level: 5, lon: 120.438, lat: 31.565 },
      { name: "锡山经济技术开发区B区", category: "工业区", emission: 72.30, level: 4, lon: 120.443, lat: 31.560 },
      { name: "联东U谷",              category: "工业区", emission: 55.80, level: 3, lon: 120.450, lat: 31.562 },
      { name: "精密机械产业园",        category: "工业区", emission: 45.20, level: 1, lon: 120.455, lat: 31.558 },
      { name: "锡山现代农业园",      category: "农业区", emission: 6.80,  level: 5, lon: 120.490, lat: 31.592 },
      { name: "太湖水稻示范园",      category: "农业区", emission: 5.25,  level: 2, lon: 120.498, lat: 31.588 },
      { name: "严家桥生态农场",      category: "农业区", emission: 3.90,  level: 1, lon: 120.485, lat: 31.595 },
      { name: "羊尖镇绿色农业园",    category: "农业区", emission: 4.50,  level: 2, lon: 120.505, lat: 31.590 },
      { name: "无锡学院-教学楼",          category: "教育区", emission: 12.60, level: 4, lon: 120.468, lat: 31.583 },
      { name: "无锡学院-图书馆",          category: "教育区", emission: 8.35,  level: 2, lon: 120.472, lat: 31.581 },
      { name: "无锡学院-实验楼",          category: "教育区", emission: 15.80, level: 5, lon: 120.475, lat: 31.585 },
      { name: "无锡学院-学生活动中心",     category: "教育区", emission: 5.60,  level: 1, lon: 120.470, lat: 31.586 },
      { name: "无锡学院-体育馆",          category: "教育区", emission: 10.20, level: 3, lon: 120.465, lat: 31.580 },
      { name: "无锡学院-学生食堂",         category: "教育区", emission: 6.75,  level: 1, lon: 120.473, lat: 31.588 }
    ]
  }
}

// ==================== 17. 极值分析 🚧 ====================
export const mockExtremeAnalysis = {
  code: 200,
  message: "success",
  data: {
    outliers: [
      { name: "锡山经济技术开发区A区", category: "工业区", emission: 86.50, zScore: 2.29, type: "HIGH", anomalyLevel: "severe_high", lon: 120.438, lat: 31.565, height: 25 },
      { name: "锡山经济技术开发区B区", category: "工业区", emission: 72.30, zScore: 2.02, type: "HIGH", anomalyLevel: "severe_high", lon: 120.443, lat: 31.560, height: 20 },
      { name: "锡东八佰伴",           category: "商业区", emission: 45.20, zScore: 2.15, type: "HIGH", anomalyLevel: "severe_high", lon: 120.476, lat: 31.590, height: 45 },
      { name: "严家桥生态农场",       category: "农业区", emission: 3.90,  zScore: -2.12, type: "LOW", anomalyLevel: "severe_low",  lon: 120.485, lat: 31.595, height: 8 },
      { name: "无锡学院-学生活动中心", category: "教育区", emission: 5.60,  zScore: -2.05, type: "LOW", anomalyLevel: "severe_low",  lon: 120.470, lat: 31.586, height: 15 },
      { name: "华润·江南府",         category: "住宅区", emission: 11.04, zScore: 1.88, type: "HIGH", anomalyLevel: "high",        lon: 120.478, lat: 31.568, height: 54 },
      { name: "太湖水稻示范园",       category: "农业区", emission: 5.25,  zScore: -1.75, type: "LOW",  anomalyLevel: "low",         lon: 120.498, lat: 31.588, height: 6 },
    ],
    globalStats: {
      totalBuildings: 28,
      outlierCount: 5,
      method: "z-score",
      threshold: 2.0
    },
    categoryStats: {
      "住宅区": { max: 22.18, min: 8.25, mean: 14.04, median: 13.43, stddev: 4.53, count: 8 },
      "商业区": { max: 45.20, min: 18.75, mean: 30.91, median: 30.28, stddev: 9.57, count: 6 },
      "工业区": { max: 86.50, min: 45.20, mean: 64.95, median: 64.05, stddev: 16.63, count: 4 },
      "农业区": { max: 6.80,  min: 3.90,  mean: 5.11,  median: 4.88,  stddev: 1.10, count: 4 },
      "教育区": { max: 15.80, min: 5.60,  mean: 9.88,  median: 9.28,  stddev: 3.60, count: 6 }
    }
  }
}

// ==================== 汇总对象（兜底匹配用）====================
export const mockData = {
  'post:/login': mockLogin,
  'get:/monitoring/building-observation-point': mockBuildingPoints,
  'get:/monitoring/statistics/category-ratio': mockCategoryRatio,
  'get:/monitoring/statistics/building-category-ratio': mockBuildingCategoryRatio,
  'get:/monitoring/statistics/trend': mockTrendAll,
  'get:/monitoring/statistics/building-trend': mockBuildingTrend,
  'get:/monitoring/statistics/category-intensity': mockCategoryIntensity,
  'get:/monitoring/statistics/overview': mockOverview,
  'get:/monitoring/query': mockQuery,
  'post:/monitoring/import': mockImportSuccess,
  'post:/monitoring/import/confirm': mockConfirm,
  'get:/monitoring/import/preview-statistics/category-ratio': mockPreviewCategoryRatio,
  'get:/monitoring/import/preview-statistics/trend': mockPreviewTrend,
  'get:/monitoring/import/preview-statistics/overview': mockPreviewOverview,
  'get:/analysis/layered-coloring': mockLayeredColoring,
  'get:/analysis/extreme': mockExtremeAnalysis
}

// ==================== 参数化 Mock 辅助函数 ====================
function filterPointsByTime(features, year, quarter) {
  const yearInt = parseInt(year)
  const totalItems = features.length

  const yearRatioMap = {
    2020: 0.375, 2021: 0.5, 2022: 0.625,
    2023: 0.75,  2024: 0.875, 2025: 1.0
  }
  const yearRatio = yearRatioMap[yearInt] || 1.0

  const quarterRatioMap = { 'Q1': 0.65, 'Q2': 0.8, 'Q3': 1.0, 'Q4': 0.85 }
  const qRatio = quarterRatioMap[quarter] || 1.0

  const count = Math.max(1, Math.floor(totalItems * yearRatio * qRatio))

  const qOffset = { 'Q1': 0, 'Q2': 1, 'Q3': 2, 'Q4': 3 }[quarter] || 0
  const offset = ((yearInt - 2020) + qOffset) % totalItems
  const sliced = []
  for (let i = 0; i < count; i++) {
    const idx = (offset + i) % totalItems
    sliced.push(features[idx])
  }

  const yearFactor = 1 + (yearInt - 2025) * 0.05
  const qf = { 'Q1': 0.9, 'Q2': 0.95, 'Q3': 1.0, 'Q4': 1.05 }
  const quarterFactor = qf[quarter] || 1.0

  const mapped = sliced.map((f, idx) => {
    const p = f.properties
    const newEmission = Math.round(p.emission * yearFactor * quarterFactor * 100) / 100
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: p.lon != null && p.lat != null ? [p.lon, p.lat] : f.geometry.coordinates
      },
      properties: {
        ...p,
        id: idx + 1,
        year: yearInt,
        quarter: quarter,
        emission: newEmission,
        createTime: `${year}-01-15T08:30:00`
      }
    }
  })

  return {
    code: 200,
    message: "success",
    data: {
      type: "FeatureCollection",
      features: mapped
    }
  }
}

// ==================== Axios 拦截器用的 Mock 匹配函数 ====================
export function getMockResponse(config) {
  const { method, url, params } = config
  const key = `${method.toLowerCase()}:${url}`

  // 地图点 — 建筑碳排放观测点（按 year/quarter 参数化，返回 GeoJSON FeatureCollection）
  if (key === 'get:/monitoring/building-observation-point') {
    const sourceFeatures = mockBuildingPoints.data.features
    return filterPointsByTime(sourceFeatures, params?.year, params?.quarter)
  }

  // 饼图 — 按 year/quarter 参数化（5个类别）
  if (key === 'get:/monitoring/statistics/building-category-ratio') {
    const year = parseInt(params?.year) || 2025
    const quarter = params?.quarter || 'Q3'
    const yearFactor = 1 + (year - 2025) * 0.05
    const qf = { 'Q1': 0.9, 'Q2': 0.95, 'Q3': 1.0, 'Q4': 1.05, 'ALL': 1.0 }
    const quarterFactor = qf[quarter] || 1.0
    return {
      code: 200,
      message: "success",
      data: mockCategoryRatio.data.map(item => ({
        ...item,
        value: Math.round(item.value * yearFactor * quarterFactor * 100) / 100
      }))
    }
  }

  // 趋势 — 按 category + yearStart/yearEnd 参数化
  if (key === 'get:/monitoring/statistics/building-trend') {
    const category = params?.category || ''
    const yearStart = parseInt(params?.yearStart) || 2020
    const yearEnd = parseInt(params?.yearEnd) || 2025

    let source = mockTrendAll.data
    if (category === '工业区') source = mockTrendIndustry.data

    const filtered = source.filter(item => {
      const itemYear = parseInt(item.name.split('-')[0])
      return itemYear >= yearStart && itemYear <= yearEnd
    })

    return { code: 200, message: "success", data: filtered }
  }

  // 排放强度 — 按 year/quarter 参数化微调
  if (key === 'get:/monitoring/statistics/category-intensity') {
    const year = parseInt(params?.year) || 2025
    const quarter = params?.quarter || 'Q3'
    const yearFactor = 1 + (year - 2025) * 0.03
    const qf = { 'Q1': 0.92, 'Q2': 0.96, 'Q3': 1.0, 'Q4': 1.08, 'ALL': 1.0 }
    const quarterFactor = qf[quarter] || 1.0
    return {
      code: 200,
      message: "success",
      data: mockCategoryIntensity.data.map(item => ({
        ...item,
        value: Math.round(item.value * yearFactor * quarterFactor * 1000) / 1000
      }))
    }
  }

  // 概览 — 按 year/quarter 参数化微调
  if (key === 'get:/monitoring/statistics/overview') {
    const year = parseInt(params?.year) || 2025
    const quarter = params?.quarter || 'Q3'
    const yearFactor = 1 + (year - 2025) * 0.05
    const qf = { 'Q1': 0.9, 'Q2': 0.95, 'Q3': 1.0, 'Q4': 1.05, 'ALL': 1.0 }
    const quarterFactor = qf[quarter] || 1.0
    const baseTotal = mockOverview.data.totalEmission * yearFactor * quarterFactor
    return {
      code: 200,
      message: "success",
      data: {
        ...mockOverview.data,
        totalEmission: Math.round(baseTotal * 100) / 100,
        avgIntensity: Math.round(mockOverview.data.avgIntensity * yearFactor * quarterFactor * 1000) / 1000,
        trend: mockOverview.data.trend.map(item => {
          const itemYear = parseInt(item.name.split('-')[0])
          const itemQuarter = item.name.split('-')[1]
          const yf = 1 + (itemYear - 2025) * 0.05
          const iqf = qf[itemQuarter] || 1.0
          return {
            ...item,
            value: Math.round(item.value * yf * iqf * 100) / 100
          }
        }).filter(item => {
          const itemYear = parseInt(item.name.split('-')[0])
          return itemYear <= year
        })
      }
    }
  }

  // 分层设色 — 按 year/quarter 参数化微调
  if (key === 'get:/analysis/layered-coloring') {
    const year = parseInt(params?.year) || 2025
    const quarter = params?.quarter || 'Q3'
    const yearFactor = 1 + (year - 2025) * 0.05
    const qf = { 'Q1': 0.9, 'Q2': 0.95, 'Q3': 1.0, 'Q4': 1.05, 'ALL': 1.0 }
    const quarterFactor = qf[quarter] || 1.0
    const factor = yearFactor * quarterFactor
    // 阈值固定不变（排放标准），仅排放量随年/季度浮动
    const thresholds = mockLayeredColoring.data.thresholds;
    return {
      code: 200,
      message: "success",
      data: {
        thresholds,
        buildings: mockLayeredColoring.data.buildings.map(b => {
          const newEmission = Math.round(b.emission * factor * 100) / 100;
          const catT = thresholds[b.category];
          // 用原始阈值（不变）重新计算等级
          let newLevel = 1;
          if (catT) {
            for (let i = 0; i < catT.levels.length; i++) {
              if (newEmission > catT.levels[i]) newLevel = i + 2;
            }
            newLevel = Math.min(newLevel, 5);
          }
          return { ...b, emission: newEmission, level: newLevel };
        })
      }
    }
  }

  // 极值分析 — 按 year/quarter 参数化微调（保留 height 字段）
  if (key === 'get:/analysis/extreme') {
    const year = parseInt(params?.year) || 2025
    const quarter = params?.quarter || 'Q3'
    const yearFactor = 1 + (year - 2025) * 0.05
    const qf = { 'Q1': 0.9, 'Q2': 0.95, 'Q3': 1.0, 'Q4': 1.05, 'ALL': 1.0 }
    const quarterFactor = qf[quarter] || 1.0
    const factor = yearFactor * quarterFactor
    return {
      code: 200,
      message: "success",
      data: {
        outliers: mockExtremeAnalysis.data.outliers.map(o => ({
          ...o,
          emission: Math.round(o.emission * factor * 100) / 100,
          zScore: Math.round(o.zScore * factor * 100) / 100
        })),
        globalStats: { ...mockExtremeAnalysis.data.globalStats },
        categoryStats: Object.fromEntries(
          Object.entries(mockExtremeAnalysis.data.categoryStats).map(([cat, s]) => [
            cat,
            { ...s, max: Math.round(s.max * factor * 100) / 100, min: Math.round(s.min * factor * 100) / 100, mean: Math.round(s.mean * factor * 100) / 100, median: Math.round(s.median * factor * 100) / 100, stddev: Math.round(s.stddev * factor * 100) / 100 }
          ])
        )
      }
    }
  }

  // 兜底：精确 key 匹配
  return mockData[key] || null
}
