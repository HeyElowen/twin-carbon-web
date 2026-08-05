# 📷 截图目录说明

本目录存放 `README.md` 中引用的演示截图。按以下**演示流程顺序**依次操作并截图，README 中的占位图片即自动生效。

> 演示脚本：向 AI-Agent 下达"**调查无锡学院周边 800m 范围内的碳排放情况**"，依次截取 5 个关键阶段。

| 文件名 | README 位置 | 截图内容 | 对应工具 |
|--------|------------|---------|---------|
| `skill-load.png` | 图 1 Skill 技能加载 | Agent 加载空间分析技能的过程展示 | `skill_execute` |
| `tool-call.png` | 图 2 工具编排调用 | 工具调用轨迹面板（api_browser / iserver_spatial 等） | `api_browser` → `iserver_spatial` |
| `spatial-render.png` | 图 3 空间分析与三维渲染 | Cesium 场景中的 800m 缓冲区 + 范围内建筑 | `frontend_cmd`(render) |
| `sandbox-highlight.png` | 图 4 沙箱分析与分级高亮 | Python 分析结果按排放高低着色（红/橙/绿） | `exec_sandbox` → `frontend_cmd`(highlight) |
| `report-gen.png` | 图 5 报告自动生成 | 图文并茂的 Word 报告预览与下载 | `document` |

> 截图尺寸建议：宽度 1280px 以上，保持 16:9 比例。
