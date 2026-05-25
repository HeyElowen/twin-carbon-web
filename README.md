# 碳知未来 - 双碳监测预警平台

基于 Vue 3 + ECharts + GSAP 构建的双碳数据可视化大屏。

## 原项目声明

本项目的布局设计、面板结构和可视化方案源自 [knight-L/sc-datav](https://github.com/knight-L/sc-datav)（Apache 2.0 许可证），原项目使用 React + Three.js 构建。

### 主要变更

- React → Vue 3 (Composition API + `<script setup>`) 重构
- 状态管理从 zustand 迁移到 Pinia
- 路由从 react-router 迁移到 vue-router
- 主题色从暖橙系改造为暗黑绿色系
- 新增筛选控制面板
- 图表配色扩展为多色系

## 许可证

本项目基于 Apache License 2.0 开源，详见 [LICENSE](./LICENSE)。
