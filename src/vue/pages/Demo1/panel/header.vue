<template>
  <div class="title-wrapper">
    <svg
      class="title-bg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 82"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient
          id="radialGradient"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="1"></stop>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"></stop>
        </radialGradient>
        <mask id="svgline-1">
          <circle r="100" cx="0" cy="0" fill="url(#radialGradient)">
            <animateMotion
              begin="0s"
              dur="3s"
              path="M0,60 L620,60 L670,80 L960,80"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>
        <mask id="svgline-2">
          <circle r="100" cx="0" cy="0" fill="url(#radialGradient)">
            <animateMotion
              begin="0s"
              dur="3s"
              path="M1920,60 L1300,60 L1250,80 L960,80"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>
      </defs>

      <path
        d="M0,0 L1920,0 L1920,60 L1300,60 L1250,80 L670,80 L620,60 L0,60 Z"
        fill="#0f1420"
      />

      <path
        d="M0,60 L620,60 L670,80 L1250,80 L1300,60 L1920,60"
        fill="none"
        stroke="rgba(59, 130, 246, 0.4)"
        strokeWidth="1"
      />

      <path
        d="M0,60 L620,60 L670,80 L960,80"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="4"
        mask="url(#svgline-1)"
      />

      <path
        d="M1920,60 L1300,60 L1250,80 L960,80"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="4"
        mask="url(#svgline-2)"
      />
    </svg>

    <div class="title">
      碳知未来-双碳监测预警平台
    </div>

    <!-- 用户信息区域 -->
    <div class="user-info">
      <el-dropdown trigger="click">
        <div class="user-trigger">
          <el-avatar :size="28" :icon="UserFilled" class="user-avatar" />
          <span class="user-name">{{ authStore.username || "用户" }}</span>
          <el-icon class="user-arrow"><Arrow-Down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">
              <el-icon><Circle-Close /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { UserFilled, ArrowDown, CircleClose } from "@element-plus/icons-vue";
import { useAuthStore } from "@/js/stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

function handleLogout() {
  ElMessageBox.confirm("确定要退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      authStore.logout();
      ElMessage.success("已退出登录");
      router.push("/login");
    })
    .catch(() => {});
}
</script>

<style scoped>
.title-wrapper {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.title-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.title {
  font-size: 36px;
  letter-spacing: 8px;
  color: #fff;
  text-shadow: 0 8px 10px rgba(59, 130, 246, 0.5);
  font-weight: 700;
  background: linear-gradient(to bottom, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.title::after {
  content: "";
  display: none;
}

/* 用户信息区域 */
.user-info {
  position: absolute;
  right: 24px;
  top: 12px;
  z-index: 10;
  pointer-events: auto;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-trigger:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.5);
}

.user-avatar {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  flex-shrink: 0;
}

.user-name {
  font-size: 14px;
  color: #e2e8f0;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-arrow {
  font-size: 12px;
  color: rgba(148, 163, 184, 0.6);
}

:deep(.el-dropdown-menu) {
  background: rgba(15, 20, 32, 0.95);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

:deep(.el-dropdown-menu__item) {
  color: #e2e8f0;
}

:deep(.el-dropdown-menu__item:hover) {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}
</style>
