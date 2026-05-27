<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="login-title">碳知未来</h1>
      <p class="login-subtitle">双碳监测预警平台</p>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
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
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useAuthStore } from "@/js/stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();
const formRef = ref(null);
const loading = ref(false);

const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

async function handleLogin() {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
  } catch {
    return;
  }

  loading.value = true;
  try {
    await authStore.login({
      username: form.username,
      password: form.password,
    });
    ElMessage.success("登录成功");
    router.push("/dashboard");
  } catch (error) {
    ElMessage.error(error.message || "登录失败");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0f1420 100%);
  position: relative;
  overflow: hidden;
}

.login-page::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(59, 130, 246, 0.08) 0%,
    transparent 50%
  );
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.login-box {
  position: relative;
  z-index: 1;
  width: 420px;
  padding: 48px 40px;
  background: rgba(15, 20, 32, 0.85);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.15);
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(to bottom, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
  letter-spacing: 4px;
}

.login-subtitle {
  font-size: 14px;
  color: rgba(148, 163, 184, 0.8);
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: 2px;
}

.login-form :deep(.el-input__wrapper) {
  background: rgba(30, 41, 59, 0.6);
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2) inset;
}

.login-form :deep(.el-input__inner) {
  color: #e2e8f0;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: rgba(148, 163, 184, 0.5);
}

.login-btn {
  width: 100%;
  font-size: 16px;
  letter-spacing: 4px;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  border: none;
}

.login-btn:hover {
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
}
</style>
