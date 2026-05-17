import axios from 'axios'
import { getMockResponse } from '@/api/mock-data.js'

// ========== Mock 开关（==========
const USE_MOCK = true  // true = 使用 mock 数据，false = 连接真实后端
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
    }
  }

  // 真实请求：带上 token（login 接口除外）
  const token = localStorage.getItem('token')
  if (token && config.url !== '/login') {
    config.headers['Authorization'] = token
  }
  // eslint-disable-next-line no-console
  console.log('[Request]', config.method?.toUpperCase(), config.url, 'headers:', JSON.stringify(config.headers))
  return config
})

// 响应拦截器：统一处理 401
request.interceptors.response.use(
  response => response.data,
  error => {
    const status = error.response?.status
    const url = error.config?.url
    const data = error.response?.data

    if (status === 401) {
      // eslint-disable-next-line no-console
      console.error('[401 认证失败]', url, data)
      import('@/stores/auth.js').then(({ useAuthStore }) => {
        const authStore = useAuthStore()
        authStore.logout()
        window.location.href = '/login'
      }).catch(() => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      })
    } else if (status) {
      // eslint-disable-next-line no-console
      console.error(`[HTTP ${status}]`, url, data)
    }
    return Promise.reject(error)
  }
)

export default request
