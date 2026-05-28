/**
 * Mock 数据文件
 * 前端开发时，将此文件复制到 src/api/ 目录下使用
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
// 与后端真实返回格式保持一致：data.features[] 为 GeoJSON Feature 数组
const buildingPointsRaw = [
  // ── 住宅区 ──
  { id: 3,  name: "安基里村1",   category: "住宅区", emission: 8.2469,  year: 2025, quarter: "Q3", lon: 120.4900785, lat: 31.56941994 },
  { id: 4,  name: "安基里村10",  category: "住宅区", emission: 26.0009, year: 2025, quarter: "Q3", lon: 120.4925604, lat: 31.57027976 },
  { id: 5,  name: "翠湖新城A座", category: "住宅区", emission: 15.3200, year: 2025, quarter: "Q3", lon: 120.4852000, lat: 31.57510000 },
  { id: 6,  name: "翠湖新城B座", category: "住宅区", emission: 12.6800, year: 2025, quarter: "Q3", lon: 120.4863000, lat: 31.57480000 },
  { id: 7,  name: "阳光花园3栋", category: "住宅区", emission: 4.5600,  year: 2025, quarter: "Q3", lon: 120.4789000, lat: 31.57230000 },
  // ── 学校（教育区）──
  { id: 8,  name: "第一中学",     category: "教育区", emission: 3.2500,  year: 2025, quarter: "Q3", lon: 120.4950000, lat: 31.56000000 },
  { id: 9,  name: "实验小学",     category: "教育区", emission: 1.8200,  year: 2025, quarter: "Q3", lon: 120.4880000, lat: 31.56500000 },
  { id: 10, name: "职业技术学院", category: "教育区", emission: 5.6700,  year: 2025, quarter: "Q3", lon: 120.5020000, lat: 31.55800000 },
  // ── 商业区 ──
  { id: 11, name: "万达广场",     category: "商业区", emission: 38.5000, year: 2025, quarter: "Q3", lon: 120.5100000, lat: 31.57500000 },
  { id: 12, name: "恒隆大厦",     category: "商业区", emission: 42.3000, year: 2025, quarter: "Q3", lon: 120.5150000, lat: 31.58000000 },
  { id: 13, name: "中央商务区A座", category: "商业区", emission: 28.7000, year: 2025, quarter: "Q3", lon: 120.5080000, lat: 31.58200000 },
  { id: 14, name: "数码广场",     category: "商业区", emission: 18.9000, year: 2025, quarter: "Q3", lon: 120.5050000, lat: 31.57800000 },
  // ── 工业区 ──
  { id: 15, name: "高新产业园A区", category: "工业区", emission: 95.6000, year: 2025, quarter: "Q3", lon: 120.5300000, lat: 31.59000000 },
  { id: 16, name: "机械制造厂",   category: "工业区", emission: 82.4000, year: 2025, quarter: "Q3", lon: 120.5400000, lat: 31.59500000 },
  { id: 17, name: "电子科技园",   category: "工业区", emission: 55.2000, year: 2025, quarter: "Q3", lon: 120.5250000, lat: 31.58800000 },
  { id: 18, name: "物流仓储中心", category: "工业区", emission: 35.8000, year: 2025, quarter: "Q3", lon: 120.5450000, lat: 31.60000000 },
  { id: 19, name: "化工厂南厂区", category: "工业区", emission: 120.5000,year: 2025, quarter: "Q3", lon: 120.5350000, lat: 31.60500000 },
  // ── 农业区 ──
  { id: 20, name: "生态种植基地", category: "农业区", emission: 2.1500,  year: 2025, quarter: "Q3", lon: 120.4600000, lat: 31.55000000 },
  { id: 21, name: "现代农业示范园", category: "农业区", emission: 3.8000,  year: 2025, quarter: "Q3", lon: 120.4700000, lat: 31.55500000 },
  { id: 22, name: "畜牧养殖场",   category: "农业区", emission: 6.2000,  year: 2025, quarter: "Q3", lon: 120.4750000, lat: 31.54500000 },
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
          createTime: p.createTime,
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
    { name: "工业区", value: 45200.8 },
    { name: "商业区", value: 38500.5 },
    { name: "住宅区", value: 26800.2 },
    { name: "农业区", value: 8900.6 },
    { name: "教育区", value: 5600.4 }
  ]
}

// ==================== 5. 饼图统计 — 建筑数据 ✅ ====================
export const mockBuildingCategoryRatio = {
  code: 200,
  message: "success",
  data: [
    { name: "工业区", value: 8200.5 },
    { name: "农业区", value: 1950.2 }
  ]
}

// ==================== 6. 趋势折线图 — 主数据（全部类型）✅ ====================
export const mockTrendAll = {
  code: 200,
  message: "success",
  data: [
    { name: "2022-Q1", value: 98500.2 },
    { name: "2022-Q2", value: 102300.5 },
    { name: "2022-Q3", value: 108600.8 },
    { name: "2022-Q4", value: 115200.3 },
    { name: "2023-Q1", value: 112500.6 },
    { name: "2023-Q2", value: 118900.4 },
    { name: "2023-Q3", value: 125000.2 },
    { name: "2023-Q4", value: 132400.8 },
    { name: "2024-Q1", value: 128600.5 },
    { name: "2024-Q2", value: 135200.3 },
    { name: "2024-Q3", value: 141800.6 },
    { name: "2024-Q4", value: 148500.2 },
    { name: "2025-Q1", value: 144200.8 },
    { name: "2025-Q2", value: 150800.5 },
    { name: "2025-Q3", value: 157300.2 }
  ]
}

// ==================== 6. 趋势折线图 — 主数据（按类型筛选）✅ ====================
export const mockTrendIndustry = {
  code: 200,
  message: "success",
  data: [
    { name: "2022-Q1", value: 12500.5 },
    { name: "2022-Q2", value: 13200.8 },
    { name: "2022-Q3", value: 14100.2 },
    { name: "2022-Q4", value: 15800.6 },
    { name: "2023-Q1", value: 15200.3 },
    { name: "2023-Q2", value: 16800.5 },
    { name: "2023-Q3", value: 17500.8 },
    { name: "2023-Q4", value: 18200.2 },
    { name: "2024-Q1", value: 17800.6 },
    { name: "2024-Q2", value: 18500.3 },
    { name: "2024-Q3", value: 19200.8 },
    { name: "2024-Q4", value: 20100.5 },
    { name: "2025-Q1", value: 19500.2 },
    { name: "2025-Q2", value: 20800.6 },
    { name: "2025-Q3", value: 21500.3 }
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
      id: 3,
      name: "中央商务区-B座",
      category: "商业区",
      area: 32000.0,
      emission: 6850.2,
      height: 45.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.385 39.905)",
      lon: 116.385,
      lat: 39.905,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 12,
      name: "中央商务区-C座",
      category: "商业区",
      area: 28000.0,
      emission: 5620.8,
      height: 38.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.387 39.907)",
      lon: 116.387,
      lat: 39.907,
      createTime: "2025-01-15T08:30:00"
    }
  ]
}

// ==================== 9. Excel 上传预览 — 成功 ✅====================
export const mockImportSuccess = {
  code: 200,
  message: "success",
  data: {
    batchId: "preview-batch-uuid-2025",
    totalCount: 15,
    validCount: 15,
    invalidCount: 0,
    previewPoints: [
      {
        name: "工业区-M01",
        category: "工业区",
        emission: 5200.5,
        lon: 116.355,
        lat: 39.895
      },
      {
        name: "农业区-M02",
        category: "农业区",
        emission: 950.2,
        lon: 116.438,
        lat: 39.945
      },
      {
        name: "商业区-M03",
        category: "商业区",
        emission: 3200.0,
        lon: 116.298,
        lat: 39.878
      }
    ],
    errors: []
  }
}

// ==================== 9. Excel 上传预览 — 有错误 ✅====================
export const mockImportError = {
  code: 200,
  message: "success",
  data: {
    batchId: "preview-batch-uuid-2025",
    totalCount: 15,
    validCount: 12,
    invalidCount: 3,
    previewPoints: [
      {
        name: "工业区-M01",
        category: "工业区",
        emission: 5200.5,
        lon: 116.355,
        lat: 39.895
      }
    ],
    errors: [
      { row: 5, field: "用电量", message: "数值不能为负数" },
      { row: 8, field: "经度", message: "经度超出合理范围" },
      { row: 12, field: "季度", message: "季度只能为 Q1/Q2/Q3/Q4" }
    ]
  }
}

// ==================== 10. 确认入库 ✅====================
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
    { name: "工业区", value: 0.36 },
    { name: "商业区", value: 0.21 },
    { name: "住宅区", value: 0.06 },
    { name: "教育区", value: 0.09 },
    { name: "农业区", value: 0.015 },
  ]
}

// ==================== 12. 碳排放概览 ✅ ====================
export const mockOverview = {
  code: 200,
  message: "success",
  data: {
    totalEmission: 157300.25,      // 总排放量（吨）
    buildingCount: 128,            // 监测建筑数
    avgIntensity: 0.18,            // 平均排放强度（吨/平方米）
    yoyChange: -5.2,               // 同比变化率（%）
    trend: [
      { name: "2023-Q4", value: 148500.20 },
      { name: "2024-Q1", value: 144200.80 },
      { name: "2024-Q2", value: 150800.50 },
      { name: "2024-Q3", value: 141800.60 },
      { name: "2024-Q4", value: 148500.20 },
      { name: "2025-Q1", value: 144200.80 },
      { name: "2025-Q2", value: 150800.50 },
      { name: "2025-Q3", value: 157300.25 },
    ]
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
  'post:/monitoring/import/confirm': mockConfirm
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

  // 兜底：精确 key 匹配
  return mockData[key] || null
}
