import request from "./request";

/**
 * 用户登录
 * @param {{username: string, password: string}} params
 */
export function login(params) {
  return request.post("/login", params);
}

/**
 * 获取当前登录用户信息
 */
export function getUserInfo() {
  return request.get("/user/info");
}
