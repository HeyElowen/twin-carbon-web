import axios from 'axios'
import { getMockResponse } from '@/api/mock-data.js'

// ========== Mock 开关（改这一行即可切换）==========
const USE_MOCK = true   // true = 使用 mock 数据，false = 连接真实后端
// ================================================

const request = axios.create({
  baseURL: '/api',      // 走 Vite 代理，mock/真实两用
  timeout: 10000
})

request.interceptors.request.use(config => {
  // Mock 模式：替换 adapter 直接返回假数据，不发真实请求
  if (USE_MOCK) {
    const mock = getMockResponse(config)
    if (mock) {
      config.adapter = () => Promise.resolve({
        data: mock,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
      // Mock 命中
    } else {
      // Mock 未命中，将走真实请求
    }
  }

  // 真实请求：带上 token（登录逻辑后续实现，本次不改）
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
