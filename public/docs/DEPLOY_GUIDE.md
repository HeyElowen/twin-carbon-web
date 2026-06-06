# 部署指南

> ⚙️ 系统部署与运维文档 — 待完善

---

## 环境要求

- Java 17+
- Node.js 18+
- PostgreSQL 15+ with PostGIS
- SuperMap iServer 11+
- Docker (可选)

## 组件

| 组件 | 目录 | 端口 |
|------|------|------|
| 后端 | `twin-carbon-boot` | 8080 |
| 前端 | `twin-carbon-web` | 5173 (dev) |
| 数据库 | PostgreSQL + PostGIS | 5432 |
| GIS 服务 | SuperMap iServer | 8090 |

## 快速启动

### 使用 Docker

```bash
docker-compose up -d
```

### 手动启动

1. 启动 PostgreSQL 并创建 `twin-carbon` 数据库
2. 启动后端：`cd twin-carbon-boot && mvn spring-boot:run`
3. 启动前端：`cd twin-carbon-web && npm run dev`

---

*本文档尚在建设中，敬请期待。*
