# 海野味

基于 Astro 构建的个人静态博客，支持 Markdown/MDX 内容、分类与标签、作者页、站内搜索、RSS、Sitemap、深浅色主题和 SEO 元数据。

## 技术栈

- [Astro 7](https://astro.build/) 与 TypeScript 6
- Astro Content Layer、Markdown 和 MDX
- Material Design 3 动态主题
- Expressive Code 代码高亮
- Astro Icon、RSS 与 Sitemap 集成
- GitHub Actions 与 GitHub Pages

## 本地开发

需要 Node.js 22.13.0+ 和 pnpm 11+。

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在 `http://localhost:4321`。

常用命令：

| 命令                | 用途                         |
| ------------------- | ---------------------------- |
| `pnpm dev`          | 启动开发服务器               |
| `pnpm check`        | 执行 Astro 类型与内容检查    |
| `pnpm format`       | 使用 Prettier 格式化项目文件 |
| `pnpm format:check` | 检查代码格式                 |
| `pnpm build`        | 构建生产版本到 `dist/`       |
| `pnpm validate`     | 依次执行检查、格式验证与构建 |
| `pnpm preview`      | 本地预览生产构建             |
| `pnpm new-post`     | 交互式创建一篇草稿文章       |

## 目录结构

```text
.
├── public/               # 原样复制到构建产物的静态资源
├── scripts/              # 内容维护脚本
├── src/
│   ├── components/       # 博客、布局、交互与 SEO 组件
│   ├── config/           # 站点和主题配置
│   ├── content/          # 文章、作者和静态页面
│   ├── content.config.ts # Content Layer 集合与字段约束
│   ├── layouts/          # 页面与文章布局
│   ├── pages/            # 页面路由、搜索 API、RSS 和 Sitemap
│   ├── styles/           # 全局样式
│   └── utils/            # 配置读取和主题工具
├── astro.config.mjs      # Astro 与集成配置
└── package.json          # 项目脚本和依赖
```

## 内容与配置

站点名称、网址、导航、分类、作者、功能开关和主题色统一维护在 `src/config/site.yaml`。修改正式域名时，也应同步检查 `astro.config.mjs` 中的 `site` 配置以及 `public/CNAME`。

文章位于 `src/content/posts/`，支持 `.md` 和 `.mdx`。可运行 `pnpm new-post` 创建带有基础 frontmatter 的草稿；发布前将 `draft` 改为 `false`。文章常用字段如下：

```yaml
---
title: '文章标题'
description: '文章摘要'
pubDate: 2026-08-04
updatedDate: 2026-08-04 # 可选
category: tech # 对应 site.yaml 中的分类 slug
tags: ['Astro', '博客'] # 可选
author: admin # 对应 site.yaml 中的作者 id
draft: false
---
```

作者详情位于 `src/content/authors/`，文件名需与作者 ID 一致；About 等独立页面内容位于 `src/content/pages/`。内容字段约束定义在 `src/content.config.ts`。

## 构建与部署

提交前建议完成完整检查：

```bash
pnpm validate
```

推送到 `master` 分支后，`.github/workflows/deploy.yml` 会自动安装依赖、检查项目、构建 `dist/` 并发布到 GitHub Pages，也可在 Actions 页面手动触发。仓库的 Pages 发布来源需要设置为 **GitHub Actions**。

自定义域名为 `blog.haiyewei.com`。除仓库中的 `public/CNAME` 外，还需在 DNS 服务商处将该域名指向 GitHub Pages，并在仓库 Pages 设置中启用 HTTPS。
