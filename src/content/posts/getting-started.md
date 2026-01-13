---
title: 'Astro 博客入门指南'
description: '学习如何使用 Astro 创建和管理你的博客内容。'
pubDate: 2026-01-09
updatedDate: 2026-01-10
tags: ['Astro', '教程', '入门']
category: tutorial
author: admin
draft: false
---

# Astro 博客入门指南

本文将介绍如何使用 Astro 的 Content Collections 功能来管理博客内容。

## 什么是 Content Collections？

Content Collections 是 Astro 提供的一种类型安全的方式来管理 Markdown 和 MDX 内容。它提供了：

- **类型安全**：通过 Zod schema 验证 frontmatter
- **自动类型推断**：TypeScript 自动推断内容类型
- **统一管理**：所有内容集中在 `src/content/` 目录

## 目录结构

```
src/
└── content/
    ├── config.ts      # 定义 collections schema
    └── blog/          # 博客文章目录
        ├── hello-world.md
        ├── getting-started.md
        └── markdown-guide.md
```

## 创建新文章

### 1. 创建 Markdown 文件

在 `src/content/blog/` 目录下创建一个新的 `.md` 文件：

```bash
touch src/content/blog/my-new-post.md
```

### 2. 添加 Frontmatter

每篇文章都需要包含 frontmatter 元数据：

```yaml
---
title: '文章标题'
description: '文章描述'
pubDate: 2026-01-10
tags: ['标签1', '标签2']
---
```

### 3. 编写内容

在 frontmatter 下方编写你的 Markdown 内容。

## 查询内容

使用 Astro 的 `getCollection` 函数查询内容：

```typescript
import { getCollection } from 'astro:content';

// 获取所有博客文章
const posts = await getCollection('blog');

// 过滤草稿
const publishedPosts = await getCollection('blog', ({ data }) => {
  return data.draft !== true;
});
```

## 下一步

- 阅读 [Markdown 使用指南](/blog/markdown-guide) 了解更多 Markdown 语法
- 查看 [Astro 官方文档](https://docs.astro.build) 获取更多信息

---

*祝你使用愉快！*