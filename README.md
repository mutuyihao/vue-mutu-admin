# vue-mutu-admin

# 介绍

Mutu Admin 后台管理系统是一个全栈项目，主要用来处理企业中后台业务——员工管理、业务管理……。使用以下技术：Vue3、TS、Naive UI、Pinia、Echarts、Strapi(Headless CMS / Nodejs)……。

已完成功能：登录、注册、角色管理、员工管理、菜单权限、单个 API 级别的权限校验(后端)。

## 目录

#### 前端部分

```sh
┌── public				      # 静态资源(不会被Webpack打包)
├── src					        # 源代码
│	├── api				        # 接口
│	├── assets			      # 静态资源(会被打包)
│	├── components		    # 公共组件
│	├── key				        # provide/inject
│	├── layout			      # 框架布局视图
│	├── plugin			      # 全局通知/弹窗等方法配置
│	├── router			      # 路由表
│	├── stores			      # Pinia状态管理
│	├── utils			        # 全局公用方法
│	├── views			        # 所有视图
│	├── App.vue			      # 入口视图
│	├── theme.ts		      # 全局NaiveUI配置
│	├── index.d.ts		    # 全局类型声明文件
│	└── main.ts			      # 入口文件
├── .env.development    # 开发模式下环境变量配置
├── .env.production     # 生产模式下环境变量配置
├── .editorconfig		    # 统一编辑器样式
├── package.json		    # 包管理
├── auto-imports.d.ts   # NaiveUI 自动引入自动生成的类型文件
├── components.d.ts     # NaiveUI 自动引入自动生成的类型文件
├── prettier.config.js	# prettier 配置
├── tsconfig.json		    # ts 配置
└── vite.config.js		   # vite 配置
```

#### 后端部分

待整理……

## 安装

```sh
# 进入项目目录

# 安装依赖
pnpm i

# 启动项目(开发模式)
pnpm dev

# 打包
pnpm build

启动完成后浏览器访问 http://localhost:5137，想使用其它端口，可以在package.json里修改。
```

# 开发

## 后续开发步骤

1. 分模块建立文件夹，建立同名路由表文件，编写路由信息
2. 在 API 文件夹也是分模块建立 API 文件，编写 API
3. 在 views 文件夹编写页面
