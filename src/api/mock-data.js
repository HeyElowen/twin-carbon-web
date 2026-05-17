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

// ==================== 2. 主数据地图点 ✅ ====================
export const mockPoints = {
  code: 200,
  message: "success",
  data: [
    {
      id: 1,
      name: "工业园区-A01",
      category: "工业区",
      area: 12500.5,
      emission: 4520.35,
      height: 18.5,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.397 39.916)",
      lon: 116.397,
      lat: 39.916,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 2,
      name: "农业科技示范园",
      category: "农业区",
      area: 85600.0,
      emission: 1280.6,
      height: 5.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.412 39.928)",
      lon: 116.412,
      lat: 39.928,
      createTime: "2025-01-15T08:30:00"
    },
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
      id: 4,
      name: "阳光花园小区",
      category: "住宅区",
      area: 56000.0,
      emission: 3240.8,
      height: 22.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.420 39.912)",
      lon: 116.42,
      lat: 39.912,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 5,
      name: "实验中学",
      category: "教育区",
      area: 18500.0,
      emission: 1580.4,
      height: 15.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.350 39.930)",
      lon: 116.35,
      lat: 39.93,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 6,
      name: "创新产业园-C区",
      category: "工业区",
      area: 22000.0,
      emission: 5800.0,
      height: 28.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.380 39.900)",
      lon: 116.38,
      lat: 39.90,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 7,
      name: "滨江商业中心",
      category: "商业区",
      area: 48000.0,
      emission: 7200.5,
      height: 55.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.395 39.920)",
      lon: 116.395,
      lat: 39.92,
      createTime: "2025-01-15T08:30:00"
    },
    {
      id: 8,
      name: "绿野农业基地",
      category: "农业区",
      area: 135000.0,
      emission: 2100.8,
      height: 4.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.430 39.940)",
      lon: 116.43,
      lat: 39.94,
      createTime: "2025-01-15T08:30:00"
    }
  ]
}

// ==================== 3. 自定义地图点 ✅ ====================
export const mockCustomPoints = {
  code: 200,
  message: "success",
  data: [
    {
      id: 1,
      name: "用户上传-工业区M01",
      category: "工业区",
      emission: 5200.5,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.355 39.895)",
      lon: 116.355,
      lat: 39.895,
      createTime: "2025-03-20T14:20:00"
    },
    {
      id: 2,
      name: "用户上传-农业区M02",
      category: "农业区",
      emission: 950.2,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.438 39.945)",
      lon: 116.438,
      lat: 39.945,
      createTime: "2025-03-20T14:20:00"
    },
    {
      id: 3,
      name: "用户上传-商业区M03",
      category: "商业区",
      emission: 3200.0,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.298 39.878)",
      lon: 116.298,
      lat: 39.878,
      createTime: "2025-03-20T14:20:00"
    },
    {
      id: 4,
      name: "用户上传-住宅区M04",
      category: "住宅区",
      emission: 2800.6,
      year: 2025,
      quarter: "Q3",
      geom: "POINT(116.368 39.915)",
      lon: 116.368,
      lat: 39.915,
      createTime: "2025-03-20T14:20:00"
    }
  ]
}

// ==================== 4. 饼图统计 — 主数据（24组真实数据，按 year+quarter 区分）✅ ====================
const mockCategoryRatioByQuarter = {
  // 2025: 工业主导，Q4 达到峰值
  '2025-Q1': [
    { name: "工业区", value: 42100 },
    { name: "商业区", value: 28300 },
    { name: "住宅区", value: 15200 },
    { name: "农业区", value: 8900 },
    { name: "教育区", value: 5500 }
  ],
  '2025-Q2': [
    { name: "工业区", value: 51200 },
    { name: "商业区", value: 31500 },
    { name: "住宅区", value: 17800 },
    { name: "农业区", value: 7200 },
    { name: "教育区", value: 4300 }
  ],
  '2025-Q3': [
    { name: "工业区", value: 64800 },
    { name: "商业区", value: 29200 },
    { name: "住宅区", value: 16500 },
    { name: "农业区", value: 5800 },
    { name: "教育区", value: 3700 }
  ],
  '2025-Q4': [
    { name: "工业区", value: 72500 },
    { name: "商业区", value: 26800 },
    { name: "住宅区", value: 14300 },
    { name: "农业区", value: 4100 },
    { name: "教育区", value: 2300 }
  ],
  // 2024: 商业主导
  '2024-Q1': [
    { name: "工业区", value: 18200 },
    { name: "商业区", value: 59800 },
    { name: "住宅区", value: 24300 },
    { name: "农业区", value: 13100 },
    { name: "教育区", value: 4600 }
  ],
  '2024-Q2': [
    { name: "工业区", value: 21500 },
    { name: "商业区", value: 68200 },
    { name: "住宅区", value: 22800 },
    { name: "农业区", value: 9800 },
    { name: "教育区", value: 5700 }
  ],
  '2024-Q3': [
    { name: "工业区", value: 19800 },
    { name: "商业区", value: 64500 },
    { name: "住宅区", value: 26100 },
    { name: "农业区", value: 11500 },
    { name: "教育区", value: 5100 }
  ],
  '2024-Q4': [
    { name: "工业区", value: 16200 },
    { name: "商业区", value: 71800 },
    { name: "住宅区", value: 19500 },
    { name: "农业区", value: 14200 },
    { name: "教育区", value: 6300 }
  ],
  // 2023: 住宅主导
  '2023-Q1': [
    { name: "工业区", value: 14300 },
    { name: "商业区", value: 21800 },
    { name: "住宅区", value: 56200 },
    { name: "农业区", value: 12800 },
    { name: "教育区", value: 4900 }
  ],
  '2023-Q2': [
    { name: "工业区", value: 16800 },
    { name: "商业区", value: 19500 },
    { name: "住宅区", value: 62800 },
    { name: "农业区", value: 10500 },
    { name: "教育区", value: 5400 }
  ],
  '2023-Q3': [
    { name: "工业区", value: 15100 },
    { name: "商业区", value: 23200 },
    { name: "住宅区", value: 59500 },
    { name: "农业区", value: 15700 },
    { name: "教育区", value: 6500 }
  ],
  '2023-Q4': [
    { name: "工业区", value: 12500 },
    { name: "商业区", value: 20400 },
    { name: "住宅区", value: 67100 },
    { name: "农业区", value: 11300 },
    { name: "教育区", value: 7200 }
  ],
  // 2022: 农业主导
  '2022-Q1': [
    { name: "工业区", value: 11200 },
    { name: "商业区", value: 16800 },
    { name: "住宅区", value: 19800 },
    { name: "农业区", value: 52800 },
    { name: "教育区", value: 9400 }
  ],
  '2022-Q2': [
    { name: "工业区", value: 13500 },
    { name: "商业区", value: 18700 },
    { name: "住宅区", value: 22500 },
    { name: "农业区", value: 49800 },
    { name: "教育区", value: 10500 }
  ],
  '2022-Q3': [
    { name: "工业区", value: 9800 },
    { name: "商业区", value: 15200 },
    { name: "住宅区", value: 21100 },
    { name: "农业区", value: 61500 },
    { name: "教育区", value: 12300 }
  ],
  '2022-Q4': [
    { name: "工业区", value: 14500 },
    { name: "商业区", value: 17500 },
    { name: "住宅区", value: 18900 },
    { name: "农业区", value: 57200 },
    { name: "教育区", value: 8900 }
  ],
  // 2021: 教育主导
  '2021-Q1': [
    { name: "工业区", value: 8200 },
    { name: "商业区", value: 10500 },
    { name: "住宅区", value: 14200 },
    { name: "农业区", value: 16800 },
    { name: "教育区", value: 50300 }
  ],
  '2021-Q2': [
    { name: "工业区", value: 9600 },
    { name: "商业区", value: 11800 },
    { name: "住宅区", value: 16500 },
    { name: "农业区", value: 19200 },
    { name: "教育区", value: 42900 }
  ],
  '2021-Q3': [
    { name: "工业区", value: 8900 },
    { name: "商业区", value: 9400 },
    { name: "住宅区", value: 12800 },
    { name: "农业区", value: 21500 },
    { name: "教育区", value: 47400 }
  ],
  '2021-Q4': [
    { name: "工业区", value: 10700 },
    { name: "商业区", value: 13200 },
    { name: "住宅区", value: 15100 },
    { name: "农业区", value: 18500 },
    { name: "教育区", value: 42500 }
  ],
  // 2020: 五类均衡，季度间波动明显
  '2020-Q1': [
    { name: "工业区", value: 18200 },
    { name: "商业区", value: 21500 },
    { name: "住宅区", value: 16800 },
    { name: "农业区", value: 22300 },
    { name: "教育区", value: 17200 }
  ],
  '2020-Q2': [
    { name: "工业区", value: 25800 },
    { name: "商业区", value: 16200 },
    { name: "住宅区", value: 24100 },
    { name: "农业区", value: 14800 },
    { name: "教育区", value: 15100 }
  ],
  '2020-Q3': [
    { name: "工业区", value: 14500 },
    { name: "商业区", value: 23800 },
    { name: "住宅区", value: 19500 },
    { name: "农业区", value: 11200 },
    { name: "教育区", value: 21000 }
  ],
  '2020-Q4': [
    { name: "工业区", value: 19800 },
    { name: "商业区", value: 17500 },
    { name: "住宅区", value: 15400 },
    { name: "农业区", value: 28600 },
    { name: "教育区", value: 8700 }
  ]
}

export const mockCategoryRatio = {
  code: 200,
  message: "success",
  data: mockCategoryRatioByQuarter['2025-Q3']
}

// ==================== 5. 饼图统计 — 自定义数据 ✅ ====================
export const mockCustomCategoryRatio = {
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
    { name: "2020-Q1", value: 78500 },
    { name: "2020-Q2", value: 81500 },
    { name: "2020-Q3", value: 86600 },
    { name: "2020-Q4", value: 92000 },
    { name: "2021-Q1", value: 87900 },
    { name: "2021-Q2", value: 91300 },
    { name: "2021-Q3", value: 97000 },
    { name: "2021-Q4", value: 102900 },
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
    { name: "2020-Q1", value: 9500 },
    { name: "2020-Q2", value: 10000 },
    { name: "2020-Q3", value: 10700 },
    { name: "2020-Q4", value: 11900 },
    { name: "2021-Q1", value: 10900 },
    { name: "2021-Q2", value: 11500 },
    { name: "2021-Q3", value: 12300 },
    { name: "2021-Q4", value: 13700 },
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

// ==================== 7. 趋势折线图 — 自定义数据 ✅ ====================
export const mockCustomTrend = {
  code: 200,
  message: "success",
  data: [
    { name: "2020-Q1", value: 2550 },
    { name: "2020-Q2", value: 2800 },
    { name: "2020-Q3", value: 3030 },
    { name: "2020-Q4", value: 3270 },
    { name: "2021-Q1", value: 2860 },
    { name: "2021-Q2", value: 3130 },
    { name: "2021-Q3", value: 3390 },
    { name: "2021-Q4", value: 3660 },
    { name: "2022-Q1", value: 3200.5 },
    { name: "2022-Q2", value: 3500.8 },
    { name: "2022-Q3", value: 3800.2 },
    { name: "2022-Q4", value: 4100.6 },
    { name: "2023-Q1", value: 3590 },
    { name: "2023-Q2", value: 3920 },
    { name: "2023-Q3", value: 4260 },
    { name: "2023-Q4", value: 4590 },
    { name: "2024-Q1", value: 4020 },
    { name: "2024-Q2", value: 4390 },
    { name: "2024-Q3", value: 4770 },
    { name: "2024-Q4", value: 5140 },
    { name: "2025-Q1", value: 4500 },
    { name: "2025-Q2", value: 4920 },
    { name: "2025-Q3", value: 5340 }
  ]
}

// ==================== 趋势折线图 — 多组真实数据（按 category + yearStart 区分）✅ ====================
const mockTrendData = {
  all: {
    '2025': [
      { name: "2025-Q1", value: 142000 },
      { name: "2025-Q2", value: 158000 },
      { name: "2025-Q3", value: 175000 }
    ],
    '2024': [
      { name: "2024-Q1", value: 98000 },
      { name: "2024-Q2", value: 105000 },
      { name: "2024-Q3", value: 112000 },
      { name: "2024-Q4", value: 128000 },
      { name: "2025-Q1", value: 135000 },
      { name: "2025-Q2", value: 142000 },
      { name: "2025-Q3", value: 158000 }
    ],
    '2023': [
      { name: "2023-Q1", value: 65000 },
      { name: "2023-Q2", value: 72000 },
      { name: "2023-Q3", value: 68000 },
      { name: "2023-Q4", value: 81000 },
      { name: "2024-Q1", value: 89000 },
      { name: "2024-Q2", value: 95000 },
      { name: "2024-Q3", value: 102000 },
      { name: "2024-Q4", value: 118000 },
      { name: "2025-Q1", value: 125000 },
      { name: "2025-Q2", value: 132000 },
      { name: "2025-Q3", value: 148000 }
    ],
    '2022': [
      { name: "2022-Q1", value: 45000 },
      { name: "2022-Q2", value: 38000 },
      { name: "2022-Q3", value: 52000 },
      { name: "2022-Q4", value: 48000 },
      { name: "2023-Q1", value: 61000 },
      { name: "2023-Q2", value: 68000 },
      { name: "2023-Q3", value: 64000 },
      { name: "2023-Q4", value: 77000 },
      { name: "2024-Q1", value: 85000 },
      { name: "2024-Q2", value: 91000 },
      { name: "2024-Q3", value: 98000 },
      { name: "2024-Q4", value: 114000 },
      { name: "2025-Q1", value: 121000 },
      { name: "2025-Q2", value: 128000 },
      { name: "2025-Q3", value: 144000 }
    ],
    '2021': [
      { name: "2021-Q1", value: 32000 },
      { name: "2021-Q2", value: 28000 },
      { name: "2021-Q3", value: 35000 },
      { name: "2021-Q4", value: 31000 },
      { name: "2022-Q1", value: 42000 },
      { name: "2022-Q2", value: 35000 },
      { name: "2022-Q3", value: 49000 },
      { name: "2022-Q4", value: 45000 },
      { name: "2023-Q1", value: 58000 },
      { name: "2023-Q2", value: 65000 },
      { name: "2023-Q3", value: 61000 },
      { name: "2023-Q4", value: 74000 },
      { name: "2024-Q1", value: 82000 },
      { name: "2024-Q2", value: 88000 },
      { name: "2024-Q3", value: 95000 },
      { name: "2024-Q4", value: 111000 },
      { name: "2025-Q1", value: 118000 },
      { name: "2025-Q2", value: 125000 },
      { name: "2025-Q3", value: 141000 }
    ],
    '2020': [
      { name: "2020-Q1", value: 25000 },
      { name: "2020-Q2", value: 22000 },
      { name: "2020-Q3", value: 28000 },
      { name: "2020-Q4", value: 30000 },
      { name: "2021-Q1", value: 31000 },
      { name: "2021-Q2", value: 27000 },
      { name: "2021-Q3", value: 34000 },
      { name: "2021-Q4", value: 30000 },
      { name: "2022-Q1", value: 41000 },
      { name: "2022-Q2", value: 34000 },
      { name: "2022-Q3", value: 48000 },
      { name: "2022-Q4", value: 44000 },
      { name: "2023-Q1", value: 57000 },
      { name: "2023-Q2", value: 64000 },
      { name: "2023-Q3", value: 60000 },
      { name: "2023-Q4", value: 73000 },
      { name: "2024-Q1", value: 81000 },
      { name: "2024-Q2", value: 87000 },
      { name: "2024-Q3", value: 94000 },
      { name: "2024-Q4", value: 110000 },
      { name: "2025-Q1", value: 117000 },
      { name: "2025-Q2", value: 124000 },
      { name: "2025-Q3", value: 140000 }
    ]
  },
  '工业区': {
    '2025': [
      { name: "2025-Q1", value: 58000 },
      { name: "2025-Q2", value: 62000 },
      { name: "2025-Q3", value: 71000 }
    ],
    '2024': [
      { name: "2024-Q1", value: 42000 },
      { name: "2024-Q2", value: 45000 },
      { name: "2024-Q3", value: 48000 },
      { name: "2024-Q4", value: 55000 },
      { name: "2025-Q1", value: 58000 },
      { name: "2025-Q2", value: 62000 },
      { name: "2025-Q3", value: 71000 }
    ],
    '2023': [
      { name: "2023-Q1", value: 28000 },
      { name: "2023-Q2", value: 31000 },
      { name: "2023-Q3", value: 29000 },
      { name: "2023-Q4", value: 36000 },
      { name: "2024-Q1", value: 40000 },
      { name: "2024-Q2", value: 43000 },
      { name: "2024-Q3", value: 46000 },
      { name: "2024-Q4", value: 53000 },
      { name: "2025-Q1", value: 56000 },
      { name: "2025-Q2", value: 60000 },
      { name: "2025-Q3", value: 69000 }
    ],
    '2022': [
      { name: "2022-Q1", value: 18000 },
      { name: "2022-Q2", value: 15000 },
      { name: "2022-Q3", value: 22000 },
      { name: "2022-Q4", value: 19000 },
      { name: "2023-Q1", value: 26000 },
      { name: "2023-Q2", value: 29000 },
      { name: "2023-Q3", value: 27000 },
      { name: "2023-Q4", value: 34000 },
      { name: "2024-Q1", value: 38000 },
      { name: "2024-Q2", value: 41000 },
      { name: "2024-Q3", value: 44000 },
      { name: "2024-Q4", value: 51000 },
      { name: "2025-Q1", value: 54000 },
      { name: "2025-Q2", value: 58000 },
      { name: "2025-Q3", value: 67000 }
    ]
  },
  '商业区': {
    '2025': [
      { name: "2025-Q1", value: 35000 },
      { name: "2025-Q2", value: 42000 },
      { name: "2025-Q3", value: 48000 }
    ],
    '2024': [
      { name: "2024-Q1", value: 28000 },
      { name: "2024-Q2", value: 31000 },
      { name: "2024-Q3", value: 33000 },
      { name: "2024-Q4", value: 38000 },
      { name: "2025-Q1", value: 35000 },
      { name: "2025-Q2", value: 42000 },
      { name: "2025-Q3", value: 48000 }
    ],
    '2023': [
      { name: "2023-Q1", value: 18000 },
      { name: "2023-Q2", value: 21000 },
      { name: "2023-Q3", value: 19000 },
      { name: "2023-Q4", value: 25000 },
      { name: "2024-Q1", value: 27000 },
      { name: "2024-Q2", value: 30000 },
      { name: "2024-Q3", value: 32000 },
      { name: "2024-Q4", value: 37000 },
      { name: "2025-Q1", value: 34000 },
      { name: "2025-Q2", value: 41000 },
      { name: "2025-Q3", value: 47000 }
    ],
    '2022': [
      { name: "2022-Q1", value: 12000 },
      { name: "2022-Q2", value: 10000 },
      { name: "2022-Q3", value: 15000 },
      { name: "2022-Q4", value: 13000 },
      { name: "2023-Q1", value: 17000 },
      { name: "2023-Q2", value: 20000 },
      { name: "2023-Q3", value: 18000 },
      { name: "2023-Q4", value: 24000 },
      { name: "2024-Q1", value: 26000 },
      { name: "2024-Q2", value: 29000 },
      { name: "2024-Q3", value: 31000 },
      { name: "2024-Q4", value: 36000 },
      { name: "2025-Q1", value: 33000 },
      { name: "2025-Q2", value: 40000 },
      { name: "2025-Q3", value: 46000 }
    ]
  },
  '农业区': {
    '2025': [
      { name: "2025-Q1", value: 22000 },
      { name: "2025-Q2", value: 28000 },
      { name: "2025-Q3", value: 32000 }
    ],
    '2024': [
      { name: "2024-Q1", value: 15000 },
      { name: "2024-Q2", value: 18000 },
      { name: "2024-Q3", value: 20000 },
      { name: "2024-Q4", value: 24000 },
      { name: "2025-Q1", value: 22000 },
      { name: "2025-Q2", value: 28000 },
      { name: "2025-Q3", value: 32000 }
    ],
    '2023': [
      { name: "2023-Q1", value: 9000 },
      { name: "2023-Q2", value: 12000 },
      { name: "2023-Q3", value: 10000 },
      { name: "2023-Q4", value: 16000 },
      { name: "2024-Q1", value: 14000 },
      { name: "2024-Q2", value: 17000 },
      { name: "2024-Q3", value: 19000 },
      { name: "2024-Q4", value: 23000 },
      { name: "2025-Q1", value: 21000 },
      { name: "2025-Q2", value: 27000 },
      { name: "2025-Q3", value: 31000 }
    ],
    '2022': [
      { name: "2022-Q1", value: 6000 },
      { name: "2022-Q2", value: 5000 },
      { name: "2022-Q3", value: 9000 },
      { name: "2022-Q4", value: 7000 },
      { name: "2023-Q1", value: 8000 },
      { name: "2023-Q2", value: 11000 },
      { name: "2023-Q3", value: 9000 },
      { name: "2023-Q4", value: 15000 },
      { name: "2024-Q1", value: 13000 },
      { name: "2024-Q2", value: 16000 },
      { name: "2024-Q3", value: 18000 },
      { name: "2024-Q4", value: 22000 },
      { name: "2025-Q1", value: 20000 },
      { name: "2025-Q2", value: 26000 },
      { name: "2025-Q3", value: 30000 }
    ]
  },
  '住宅区': {
    '2025': [
      { name: "2025-Q1", value: 27000 },
      { name: "2025-Q2", value: 26000 },
      { name: "2025-Q3", value: 24000 }
    ],
    '2024': [
      { name: "2024-Q1", value: 22000 },
      { name: "2024-Q2", value: 21000 },
      { name: "2024-Q3", value: 20000 },
      { name: "2024-Q4", value: 19000 },
      { name: "2025-Q1", value: 27000 },
      { name: "2025-Q2", value: 26000 },
      { name: "2025-Q3", value: 24000 }
    ],
    '2023': [
      { name: "2023-Q1", value: 18000 },
      { name: "2023-Q2", value: 17000 },
      { name: "2023-Q3", value: 16000 },
      { name: "2023-Q4", value: 15000 },
      { name: "2024-Q1", value: 21000 },
      { name: "2024-Q2", value: 20000 },
      { name: "2024-Q3", value: 19000 },
      { name: "2024-Q4", value: 18000 },
      { name: "2025-Q1", value: 26000 },
      { name: "2025-Q2", value: 25000 },
      { name: "2025-Q3", value: 23000 }
    ],
    '2022': [
      { name: "2022-Q1", value: 14000 },
      { name: "2022-Q2", value: 13000 },
      { name: "2022-Q3", value: 12000 },
      { name: "2022-Q4", value: 11000 },
      { name: "2023-Q1", value: 17000 },
      { name: "2023-Q2", value: 16000 },
      { name: "2023-Q3", value: 15000 },
      { name: "2023-Q4", value: 14000 },
      { name: "2024-Q1", value: 20000 },
      { name: "2024-Q2", value: 19000 },
      { name: "2024-Q3", value: 18000 },
      { name: "2024-Q4", value: 17000 },
      { name: "2025-Q1", value: 25000 },
      { name: "2025-Q2", value: 24000 },
      { name: "2025-Q3", value: 22000 }
    ]
  }
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

// ==================== 汇总对象（用于 Axios 拦截器方案）====================
// 注意：只有 ✅ 标记的接口路径与真实后端一致，🚧 标记的接口待后端实现
export const mockData = {
  // ✅ 已实现接口（路径与真实后端一致）
  'post:/login': mockLogin,
  'get:/monitoring/observation-point': mockPoints,
  'get:/monitoring/custom-observation-point': mockCustomPoints,
  'get:/monitoring/statistics/category-ratio': mockCategoryRatio,
  'get:/monitoring/statistics/custom-category-ratio': mockCustomCategoryRatio,
  'get:/monitoring/statistics/trend': mockTrendAll,
  'get:/monitoring/statistics/custom-trend': mockCustomTrend,
  'get:/monitoring/query': mockQuery,

  // 🚧 待实现接口（路径为规划中的接口，后端尚未开发）
  // 模板下载返回二进制文件，Mock 模式下建议前端直接本地预览或使用静态文件
  // 'get:/monitoring/template/download': null,
  'post:/monitoring/import': mockImportSuccess,
  'post:/monitoring/import/confirm': mockConfirm
}

// ==================== 新增：各类别趋势数据 ====================
function generateTrendFromAll(source, ratio) {
  return {
    code: 200,
    message: "success",
    data: source.data.map(d => ({
      name: d.name,
      value: Math.round(d.value * ratio * 100) / 100
    }))
  }
}

export const mockTrendCommercial = generateTrendFromAll(mockTrendAll, 0.25)
export const mockTrendAgriculture = generateTrendFromAll(mockTrendAll, 0.08)
export const mockTrendResidential = generateTrendFromAll(mockTrendAll, 0.18)

// ==================== 趋势图年份范围过滤 ====================
function filterTrendByYearRange(sourceData, yearStart, yearEnd) {
  const start = parseInt(yearStart) || 2020
  const end = parseInt(yearEnd) || 2025
  return {
    code: 200,
    message: "success",
    data: sourceData.data.filter(d => {
      const year = parseInt(d.name.split('-')[0])
      return year >= start && year <= end
    })
  }
}

// ==================== 参数化 Mock 响应 ====================
function filterPointsByTime(mockObj, year, quarter) {
  const yearInt = parseInt(year)
  const totalItems = mockObj.data.length

  // 年份决定基础比例
  const yearRatioMap = {
    2020: 0.375, 2021: 0.5, 2022: 0.625,
    2023: 0.75,  2024: 0.875, 2025: 1.0
  }
  const yearRatio = yearRatioMap[yearInt] || 1.0

  // 季度进一步微调条数（Q1 最少，Q3 最全）
  const quarterRatioMap = { 'Q1': 0.65, 'Q2': 0.8, 'Q3': 1.0, 'Q4': 0.85 }
  const qRatio = quarterRatioMap[quarter] || 1.0

  const count = Math.max(1, Math.floor(totalItems * yearRatio * qRatio))

  // 年份 + 季度 双重偏移，不同季度返回不同组合
  const qOffset = { 'Q1': 0, 'Q2': 1, 'Q3': 2, 'Q4': 3 }[quarter] || 0
  const offset = ((yearInt - 2020) + qOffset) % totalItems
  const sliced = []
  for (let i = 0; i < count; i++) {
    const idx = (offset + i) % totalItems
    sliced.push(mockObj.data[idx])
  }

  // 调整字段值
  const yearFactor = 1 + (yearInt - 2025) * 0.05
  const qf = { 'Q1': 0.9, 'Q2': 0.95, 'Q3': 1.0, 'Q4': 1.05 }
  const quarterFactor = qf[quarter] || 1.0

  return {
    code: 200,
    message: "success",
    data: sliced.map((p, idx) => ({
      ...p,
      id: idx + 1,
      year: yearInt,
      quarter: quarter,
      emission: Math.round(p.emission * yearFactor * quarterFactor * 100) / 100,
      createTime: `${year}-01-15T08:30:00`
    }))
  }
}

function filterQueryByKeyword(mockObj, keyword) {
  if (!keyword) return mockObj
  const lowerKw = keyword.toLowerCase()
  const filtered = mockObj.data.filter(item =>
    item.name.toLowerCase().includes(lowerKw) ||
    item.category.toLowerCase().includes(lowerKw)
  )
  return { ...mockObj, data: filtered }
}

export function getMockResponse(config) {
  const { method, url, params, data } = config
  const key = `${method.toLowerCase()}:${url}`

  // 对趋势图接口按 category + yearStart 返回独立的真实数据
  if (key === 'get:/monitoring/statistics/trend') {
    const category = params?.category || 'all'
    const yearStart = params?.yearStart || '2020'
    const catKey = category || 'all'
    const source = mockTrendData[catKey]?.[yearStart]
      || mockTrendData[catKey]?.['2020']
      || mockTrendData['all']?.['2020']
    return { code: 200, message: "success", data: source || [] }
  }

  if (key === 'get:/monitoring/statistics/custom-trend') {
    return filterTrendByYearRange(mockCustomTrend, params?.yearStart, params?.yearEnd)
  }

  if (key === 'get:/monitoring/observation-point') {
    const year = params?.year || '2025'
    const quarter = params?.quarter || 'Q3'
    return filterPointsByTime(mockPoints, year, quarter)
  }

  if (key === 'get:/monitoring/custom-observation-point') {
    const year = params?.year || '2025'
    const quarter = params?.quarter || 'Q3'
    return filterPointsByTime(mockCustomPoints, year, quarter)
  }

  if (key === 'get:/monitoring/statistics/category-ratio') {
    const year = params?.year || '2025'
    const quarter = params?.quarter || 'Q3'
    const dataKey = `${year}-${quarter}`
    return {
      code: 200,
      message: "success",
      data: mockCategoryRatioByQuarter[dataKey] || mockCategoryRatioByQuarter['2025-Q3']
    }
  }

  if (key === 'get:/monitoring/statistics/custom-category-ratio') {
    const year = params?.year || '2025'
    const customByYear = {
      '2025': [
        { name: "工业区", value: 9200 },
        { name: "农业区", value: 3100 }
      ],
      '2024': [
        { name: "工业区", value: 4500 },
        { name: "农业区", value: 7800 }
      ],
      '2023': [
        { name: "工业区", value: 11200 },
        { name: "农业区", value: 2400 }
      ],
      '2022': [
        { name: "工业区", value: 2800 },
        { name: "农业区", value: 9500 }
      ],
      '2021': [
        { name: "工业区", value: 6800 },
        { name: "农业区", value: 6200 }
      ],
      '2020': [
        { name: "工业区", value: 5100 },
        { name: "农业区", value: 4900 }
      ]
    }
    return {
      code: 200,
      message: "success",
      data: customByYear[year] || customByYear['2025']
    }
  }

  if (key === 'get:/monitoring/query') {
    const name = params?.name
    if (name) return filterQueryByKeyword(mockQuery, name)
    return mockQuery
  }

  // 兜底：基础 key 匹配
  return mockData[key] || null
}
