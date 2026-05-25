import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login as loginApi } from "@/api/auth";

const TOKEN_KEY = "twin-carbon-token";
const USERNAME_KEY = "twin-carbon-username";

export const useAuthStore = defineStore("auth", () => {
  // State
  const token = ref(localStorage.getItem(TOKEN_KEY) || "");
  const username = ref(localStorage.getItem(USERNAME_KEY) || "");

  // Getters
  const isLoggedIn = computed(() => !!token.value);

  // Actions
  /**
   * 登录
   * @param {{username: string, password: string}} credentials
   */
  async function login(credentials) {
    const res = await loginApi(credentials);
    if (res.code === 200 && res.data) {
      token.value = res.data.token || "";
      username.value = res.data.username || credentials.username;
      // 持久化到 localStorage
      localStorage.setItem(TOKEN_KEY, token.value);
      localStorage.setItem(USERNAME_KEY, username.value);
      return res.data;
    }
    throw new Error(res.message || "登录失败");
  }

  /**
   * 退出登录
   */
  function logout() {
    token.value = "";
    username.value = "";
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  }

  /**
   * 初始化：从 localStorage 恢复登录状态
   */
  function init() {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    if (savedToken) {
      token.value = savedToken;
    }
    if (savedUsername) {
      username.value = savedUsername;
    }
  }

  return {
    token,
    username,
    isLoggedIn,
    login,
    logout,
    init,
  };
});
