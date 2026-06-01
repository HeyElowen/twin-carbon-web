import axios from "axios";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/js/stores/useAuthStore";
import { getMockResponse } from "./mock-data";
import { fa } from "element-plus/es/locales.mjs";

// ========== Mock 开关 ==========
// true  = 使用本地 Mock 数据（不发真实请求）
// false = 调用真实后端 API
const USE_MOCK = false; // 开发阶段默认开启 Mock，生产环境请务必关闭
// =============================

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器：Mock 模式替换 adapter / 真实模式自动携带 token
request.interceptors.request.use(
  (config) => {
    // Mock 模式：匹配到 mock 数据则直接返回，不发真实请求
    if (USE_MOCK) {
      const mock = getMockResponse(config);
      if (mock) {
        config.adapter = () =>
          Promise.resolve({
            data: mock,
            status: 200,
            statusText: "OK",
            headers: {},
            config,
          });
      }
    }

    // 真实请求：自动携带 token（login 接口除外）
    const authStore = useAuthStore();
    if (authStore.token && config.url !== "/login") {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一错误处理
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 如果后端返回的 code 不是 200，当作错误处理
    if (res.code !== undefined && res.code !== 200) {
      ElMessage.error(res.message || "请求失败");
      // 401 未登录，清除状态并跳转
      if (res.code === 401) {
        const authStore = useAuthStore();
        authStore.logout();
        window.location.hash = "#/login";
      }
      return Promise.reject(new Error(res.message || "请求失败"));
    }
    return res;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || "网络错误";
    ElMessage.error(message);
    // HTTP 401 也处理
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      window.location.hash = "#/login";
    }
    return Promise.reject(error);
  }
);

export default request;
