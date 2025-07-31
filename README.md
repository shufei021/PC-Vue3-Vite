# 🚀 vue3-pc - 基于 Vue 3 的现代化 PC 端前端项目模板

> 一个开箱即用、功能完整、规范严谨的 Vue 3 + TypeScript + Vite 前端项目模板，适用于企业级 PC 管理后台、中后台系统开发。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-green)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple)](https://vitejs.dev)

---

## 📋 项目简介

`vue3-pc` 是一个基于最新前端技术栈构建的**高性能、高可维护性**的 PC 端项目脚手架。它集成了现代前端开发所需的核心工具链，帮助团队快速启动项目，统一代码风格，提升开发效率与代码质量。

---

## 🛠️ 技术栈

- **核心框架**: [Vue 3](https://vuejs.org) (Composition API + `<script setup>`)
- **类型系统**: [TypeScript](https://www.typescriptlang.org/) (v5+)
- **构建工具**: [Vite](https://vitejs.dev) (极速冷启动，HMR)
- **状态管理**: [Pinia](https://pinia.vuejs.org) (官方推荐)
- **路由**: [Vue Router](https://router.vuejs.org) (v4+)
- **代码规范**:
  - [ESLint](https://eslint.org) + [TypeScript ESLint](https://typescript-eslint.io) (代码质量)
  - [Prettier](https://prettier.io) (代码格式化)
- **Git 规范**:
  - [Husky](https://typicode.github.io/husky) (Git Hooks)
  - [lint-staged](https://github.com/okonet/lint-staged) (仅检查暂存文件)
  - [Commitlint](https://commitlint.js.org) (提交信息格式校验)
- **包管理**: [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

---

## 📦 功能特性

✅ **开箱即用**：初始化项目，安装依赖即可开发  
✅ **TypeScript 支持**：全程类型安全，提升开发体验  
✅ **ESLint + Prettier**：统一团队代码风格，自动修复  
✅ **Git 提交规范**：强制使用 `feat:`, `fix:`, `docs:` 等格式，便于生成 CHANGELOG  
✅ **Husky + lint-staged**：提交前自动检查并格式化代码  
✅ **响应式布局**：适配主流 PC 分辨率  
✅ **模块化结构**：清晰的目录结构，易于维护  
✅ **生产优化**：Vite 构建，代码分割、压缩、缓存等

---

## 📁 目录结构

```bash
vue3-pc/
├── src/
│   ├── assets/            # 静态资源
│   ├── components/        # 全局组件
│   ├── composables/       # 组合式函数 (useXxx)
│   ├── layouts/           # 布局组件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── views/             # 页面视图
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── public/                # 静态资源（不经过构建）
├── .husky/                # Git Hooks 脚本
├── .vscode/               # VS Code 推荐配置
├── eslint.config.js       # ESLint 配置 (Flat Config)
├── .prettierrc.cjs        # Prettier 配置
├── commitlint.config.cjs  # Commitlint 配置
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── package.json
└── README.md
```

````

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/vue3-pc.git
cd vue3-pc
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 4. 构建生产版本

```bash
npm run build
# 或
yarn build
```

构建产物位于 `dist/` 目录。

### 5. 本地预览生产环境

```bash
npm run preview
# 或
yarn preview
```

---

## 📝 提交规范

本项目使用 **Conventional Commits** 规范，请使用以下格式提交代码：

```bash
git commit -m "type: description"
```

**`type` 可选值**：

| 类型       | 说明                       |
| ---------- | -------------------------- |
| `feat`     | 新功能                     |
| `fix`      | 修复 bug                   |
| `docs`     | 文档更新                   |
| `style`    | 代码格式调整（不影响运行） |
| `refactor` | 代码重构                   |
| `perf`     | 性能优化                   |
| `test`     | 测试相关                   |
| `build`    | 构建系统                   |
| `ci`       | CI 配置                    |
| `chore`    | 其他杂项                   |
| `revert`   | 回滚提交                   |

✅ 示例：

```bash
git commit -m "feat: 添加用户登录页面"
git commit -m "fix: 修复按钮点击无效问题"
git commit -m "chore: 升级依赖版本"
```

> ❌ 错误示例：`git commit -m "update files"`（会被拒绝）

---

## 🧪 脚本命令

| 命令              | 说明                       |
| ----------------- | -------------------------- |
| `npm run dev`     | 启动开发服务器             |
| `npm run build`   | 构建生产版本               |
| `npm run preview` | 预览生产构建               |
| `npm run lint`    | 手动运行 ESLint 检查       |
| `npm run format`  | 手动运行 Prettier 格式化   |
| `npm run commit`  | （可选）使用交互式提交工具 |

> 💡 提示：提交代码时，Husky 会自动触发 `lint-staged` 和 `commitlint`，无需手动运行。

---

## 🧰 开发建议

- 使用 VS Code？推荐安装插件：**Volar**, **ESLint**, **Prettier**, **TypeScript Vue Plugin (Volar)**
- 提交代码前，确保 `npm run lint` 和 `npm run format` 无报错
- 组件命名采用 `PascalCase`，文件名如 `UserCard.vue`
- 组合式函数命名以 `use` 开头，如 `useUser.ts`

---

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源，欢迎使用和贡献。

---

## 🙌 贡献

欢迎提交 Issue 或 Pull Request！
请确保遵循本项目的代码规范和提交规范。

---

> 🌟 **vue3-pc** — 让前端开发更规范、更高效！

```

---

## ✅ 使用说明

1. 将上述内容复制到你的项目根目录的 `README.md` 文件中。
2. 替换以下占位符：
   - `https://github.com/your-username/vue3-pc.git` → 你的项目仓库地址
   - 项目名称（如 `vue3-pc`）→ 你的实际项目名
   - 可根据需要增删“功能特性”、“目录结构”等内容。
3. 如果你有截图、演示地址、设计文档等，可以在 `## 📄 演示` 部分添加。
````
