# 计算器（React + Vite + Tailwind）

这是一个使用 **React + Vite + Tailwind CSS** 构建的简易计算器页面项目。  
支持 **加、减、乘、除** 运算，支持 **重置**，并提供 **暗黑模式切换**（会记住上次选择）。

---

## 功能特点

- **四则运算**：输入任意数字，点击「+ / − / × / ÷」按钮，对当前结果进行连续计算。
- **重置功能**：一键将结果恢复为 0，并清空错误提示。
- **暗黑模式**：
  - 右上角按钮可在「明亮 / 暗黑」模式之间切换。
  - 使用 `localStorage` 记住用户选择，下次打开页面仍保持上次模式。
- **响应式布局**：
  - 使用 Tailwind CSS 构建，桌面和小屏设备上都有不错的显示效果。

---

## 运行环境要求

- **操作系统**：Windows / macOS / Linux 均可
- **Node.js**：推荐 **18+**（本机24）
- **包管理工具**：`npm`（Node.js 自带）

> ⚠️ 注意：如果使用过旧的 Node 版本（例如 16.13.1），可能会在启动 Vite 时遇到  
> `crypto.getRandomValues is not a function` 等错误，请务必升级到 Node 18 以上。

---

## 本地运行步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/paopaolong610/wz-cursor.git
   cd wz-cursor
2. **安装依赖**
   npm install
3. **启动**
   npm run dev
4. **打开浏览器**
   VITE v5.x ready in xxx ms
➜  Local:   http://localhost:5173/

## 使用说明
在输入框中输入任意数字（例如 3.14、-2、100）。
点击下方任意一个运算按钮：
+：当前结果 + 输入数字
−：当前结果 − 输入数字
×：当前结果 × 输入数字
÷：当前结果 ÷ 输入数字（除数为 0 时结果为 NaN）
点击右上角「重置」按钮，可以将当前结果清空为 0。
点击右上角「明亮 / 暗黑」按钮，可以切换页面主题：

##技术栈与结构
技术栈与项目结构
前端框架：React 18
构建工具：Vite 5
样式：Tailwind CSS 3（darkMode: 'class'）
语言：JavaScript（JSX）
主要文件结构（简要）：

├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ src
   ├─ main.jsx        # React 入口
   ├─ App.jsx         # 计算器页面核心逻辑和 UI
   └─ index.css       # Tailwind 指令和基础样式

## 常见问题
1. 启动时报错：crypto.getRandomValues is not a function
原因：Node 版本太旧（例如 16.13.1），而 Vite 5 需要更高版本的 Node。

解决方案：

升级到 Node 18+（推荐 20 / 22 / 24）

删除依赖后重装：

rmdir /s /q node_modules   # Windows PowerShell
del package-lock.json
npm install
npm run dev

！！！ 要注意，可能会有其他版本Node，要在环境配置里将Node.24放在其他版本上边。

2. 浏览器页面空白，终端报 [postcss] Unexpected token (1:1)
可能原因：tailwind.config.js 中存在 Git 合并冲突标记，例如：

<<<<<<< HEAD
...
=======
...
>>>>>>> xxxx
解决方案：
打开 tailwind.config.js，删除所有 <<<<<<< / ======= / >>>>>>> 这些标记，只保留一份合法配置，例如：

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

