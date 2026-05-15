import request from '@/request/request.js'

// ==================== 1. 登录 ====================
export function login(data) {
  return request.post('/login', data)
}

// ==================== 2. 观测点（地图点）====================
export function getObservationPoints(params) {
  return request.get('/monitoring/observation-point', { params })
}

export function getCustomObservationPoints(params) {
  return request.get('/monitoring/custom-observation-point', { params })
}

// ==================== 3. 统计图表 ====================
export function getCategoryRatio(params) {
  return request.get('/monitoring/statistics/category-ratio', { params })
}

export function getCustomCategoryRatio(params) {
  return request.get('/monitoring/statistics/custom-category-ratio', { params })
}

export function getTrend(params) {
  return request.get('/monitoring/statistics/trend', { params })
}

export function getCustomTrend(params) {
  return request.get('/monitoring/statistics/custom-trend', { params })
}

// ==================== 4. 对象查询 ====================
export function queryObjects(params) {
  return request.get('/monitoring/query', { params })
}

// ==================== 5. Excel 导入 ====================
export function previewImport(data) {
  return request.post('/monitoring/import', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function confirmImport(data) {
  return request.post('/monitoring/import/confirm', data)
}
