# API 参考

> 📊 后端接口文档 — 待完善

---

## 概述

本文档列出碳语智图系统的全部 RESTful API 端点、请求参数与返回格式。

## 接口列表

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/login` | 用户登录 |
| `GET` | `/monitoring/building-observation-point` | 建筑碳排放观测点 |
| `GET` | `/monitoring/statistics/building-category-ratio` | 用地类型碳排放占比 |
| `GET` | `/monitoring/statistics/building-trend` | 碳排放趋势 |
| `GET` | `/monitoring/statistics/category-intensity` | 排放强度 |
| `GET` | `/monitoring/statistics/overview` | 概览统计 |
| `GET` | `/monitoring/building-query` | 按名称查询 |
| `GET` | `/monitoring/template/download` | 下载 Excel 模板 |
| `POST` | `/monitoring/import` | 上传 Excel 预览 |
| `POST` | `/monitoring/import/confirm` | 确认入库 |
| `GET` | `/monitoring/import/preview-statistics/category-ratio` | 预览饼图 |
| `GET` | `/monitoring/import/preview-statistics/trend` | 预览趋势 |
| `GET` | `/monitoring/import/preview-statistics/overview` | 预览概览 |

## 认证

所有接口（除登录外）需要在请求头携带 `Authorization: Bearer <token>`。

---

*本文档尚在建设中，敬请期待。*
