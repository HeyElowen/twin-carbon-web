<template>
  <div class="login-page">
    <!-- SVG 背景装饰 -->
    <svg class="login-bg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#162a45" stop-opacity="1" />
          <stop offset="100%" stop-color="#0a111f" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(114,198,195,0)" />
          <stop offset="50%" stop-color="rgba(114,198,195,0.3)" />
          <stop offset="100%" stop-color="rgba(114,198,195,0)" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
      <!-- 装饰线条 -->
      <line x1="0" y1="200" x2="1920" y2="200" stroke="url(#lineGrad)" stroke-width="1" />
      <line x1="0" y1="880" x2="1920" y2="880" stroke="url(#lineGrad)" stroke-width="1" />
      <circle cx="960" cy="540" r="380" stroke="rgba(114,198,195,0.06)" stroke-width="1" fill="none" />
      <circle cx="960" cy="540" r="280" stroke="rgba(114,198,195,0.08)" stroke-width="1" fill="none" />
    </svg>

    <div class="login-container">
      <!-- 顶部标题 -->
      <div class="login-header">
        <h1>城市碳排放三维可视化系统</h1>
        <p>Carbon Emission 3D Visualization System</p>
      </div>

      <!-- 登录面板 -->
      <div class="login-panel">
        <h2 class="panel-title">用户登录</h2>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          @keyup.enter="handleLogin"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="Lock"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              class="login-btn"
              @click="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 底部装饰 -->
      <div class="login-footer">
        <span>© 2025 城市碳排放可视化系统</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, message: '密码长度至少4位', trigger: 'blur' }
  ]
}

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  try {
    await authStore.login({
      username: form.username,
      password: form.password
    })
    ElMessage.success('登录成功')
    router.push('/home')
  } catch (error) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  padding: 0 24px;
}

/* ── 顶部标题 ── */
.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h1 {
  color: #e2e8f0;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 8px;
  text-shadow: 0 0 20px rgba(114, 198, 195, 0.35);
}

.login-header p {
  color: #6d88a3;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* ── 登录面板 ── */
.login-panel {
  width: 100%;
  background: rgba(32, 51, 71, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(73, 93, 104, 0.6);
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}

.panel-title {
  color: #72c6c3;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.login-btn {
  width: 100%;
  background: linear-gradient(90deg, #5eb3b0, #72c6c3);
  border: none;
  font-size: 15px;
  letter-spacing: 2px;
  margin-top: 8px;
  transition: all 0.3s;
}

.login-btn:hover {
  background: linear-gradient(90deg, #6ac4c1, #82d6d3);
  box-shadow: 0 0 16px rgba(114, 198, 195, 0.4);
}

/* ── 底部 ── */
.login-footer {
  margin-top: 32px;
  color: #4a6275;
  font-size: 12px;
  text-align: center;
}

/* ── Element Plus 深色适配 ── */
:deep(.el-form-item__label) {
  color: #cbd5e1;
  font-size: 13px;
}

:deep(.el-input__wrapper) {
  background: rgba(15, 23, 42, 0.6);
  box-shadow: 0 0 0 1px rgba(73, 93, 104, 0.6) inset;
}

:deep(.el-input__inner) {
  color: #e2e8f0;
}

:deep(.el-input__inner::placeholder) {
  color: #4a6275;
}

:deep(.el-input__icon) {
  color: #6d88a3;
}
</style>
