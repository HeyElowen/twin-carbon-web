<template>
  <div class="not-found">
    <div class="nf-code">404</div>
    <div class="nf-title">页面不存在</div>
    <div class="nf-desc">你访问的页面不存在或已被移除</div>
    <el-button type="primary" @click="$router.push('/dashboard')">返回首页</el-button>
  </div>
</template>

<style scoped>
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #070a0e;
  gap: 16px;
}
.nf-code {
  font-size: 80px;
  font-weight: 800;
  color: rgba(59, 130, 246, 0.3);
  font-family: monospace;
  line-height: 1;
}
.nf-title {
  font-size: 24px;
  font-weight: 700;
  color: #e0e6f0;
}
.nf-desc {
  font-size: 14px;
  color: rgba(224, 230, 240, 0.4);
  margin-bottom: 8px;
}
</style>
