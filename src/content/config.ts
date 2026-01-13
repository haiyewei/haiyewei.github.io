import { defineCollection, z } from 'astro:content'

/**
 * 文章集合
 * category 字段对应 site.yaml 中定义的分类 slug
 * author 字段对应 site.yaml 中定义的作者 id
 */
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    /** 文章分类，对应 site.yaml 中的 categories[].slug */
    category: z.string().optional(),
    /** 文章作者，对应 site.yaml 中的 authors[].id */
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

/**
 * 静态页面集合
 * 用于管理 about、contact、privacy 等静态页面的 Markdown 内容
 */
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
})

/**
 * 作者集合
 * 用于管理作者的详细信息和个人介绍
 * 文件名（不含扩展名）作为作者 ID，需与 site.yaml 中的 authors[].id 对应
 */
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    /** 作者名称（必填） */
    name: z.string(),
    /** 邮箱地址（可选） */
    email: z.string().email().optional(),
    /** 头像 URL（可选） */
    avatar: z.string().optional(),
    /** 作者简介（可选） */
    bio: z.string().optional(),
    /** 社交链接（可选） */
    social: z
      .object({
        github: z.string().url().optional(),
        twitter: z.string().url().optional(),
        website: z.string().url().optional(),
        linkedin: z.string().url().optional(),
      })
      .optional(),
  }),
})

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  authors: authorsCollection,
}
