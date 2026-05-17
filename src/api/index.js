import request from '@/request/request.js'

// ==================== 1. 登录 ====================
export const login = (data) => request.post('/login', data)

// ==================== 2. 观测点（地图点）====================
export const getObservationPoints = (params) =>
  request.get('/monitoring/observation-point', { params })

export const getCustomObservationPoints = (params) =>
  request.get('/monitoring/custom-observation-point', { params })

// ==================== 3. 统计图表 ====================
export const getCategoryRatio = (params) =>
  request.get('/monitoring/statistics/category-ratio', { params })

export const getCustomCategoryRatio = (params) =>
  request.get('/monitoring/statistics/custom-category-ratio', { params })

export const getTrend = (params) =>
  request.get('/monitoring/statistics/trend', { params })

export const getCustomTrend = (params) =>
  request.get('/monitoring/statistics/custom-trend', { params })

// ==================== 4. 对象查询 ====================
export const queryObjects = (params) =>
  request.get('/monitoring/query', { params })

// ==================== 5. Excel 导入 ====================
export const previewImport = (data) =>
  request.post('/monitoring/import', data)
  // 注意：不要手动设置 Content-Type，让 axios 根据 FormData 自动添加含 boundary 的 multipart header

export const confirmImport = (data) =>
  request.post('/monitoring/import/confirm', data)
