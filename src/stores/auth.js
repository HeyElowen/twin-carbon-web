import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login as loginApi } from '@/api/index.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(null)
  const username = ref('')
  const sceneUrl = ref('')

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  // Actions
  async function login(data) {
    const res = await loginApi(data)
    if (res.code === 200 && res.data) {
      token.value = res.data.token || null
      username.value = res.data.username || ''
      sceneUrl.value = res.data.config?.sceneUrl || ''
      // 同时写入 localStorage，供 request 拦截器读取（避免循环依赖）
      if (token.value) {
        localStorage.setItem('token', token.value)
      }
      return res
    }
    throw new Error(res.message || '登录失败')
  }

  function logout() {
    token.value = null
    username.value = ''
    sceneUrl.value = ''
    localStorage.removeItem('token')
  }

  return {
    token,
    username,
    sceneUrl,
    isLoggedIn,
    login,
    logout
  }
}, {
  persist: {
    key: 'auth',
    paths: ['token', 'username', 'sceneUrl']
  }
})
