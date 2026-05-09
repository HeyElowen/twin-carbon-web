import axios from 'axios'
import { mockData } from '@/api/mock-data.js'

// ========== Mock 开关 ==========
const USE_MOCK = true  // true = 使用 mock，false = 连真实后端
// ==============================

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000
})

request.interceptors.request.use(config => {
  // Mock 模式：直接返回假数据，不发请求
  if (USE_MOCK) {
    const key = `${config.method.toLowerCase()}:${config.url}`
    const mock = mockData[key]
    if (mock) {
      return Promise.resolve({ data: mock, status: 200, config })
    }
  }
  
  // 真实请求：带上 token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['X-Token'] = token
  }
  return config
})

// 响应拦截器：统一处理 401
request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default request