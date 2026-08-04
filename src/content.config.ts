import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * Content Layer collections. Each collection keeps file-name based IDs so
 * existing post, page, and author URLs remain stable after the Astro 7 move.
 */
const postsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
  }),
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

const pagesCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pages',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
})

const authorsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/authors',
  }),
  schema: z.object({
    name: z.string(),
    email: z.email().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    social: z
      .object({
        github: z.url().optional(),
        twitter: z.url().optional(),
        website: z.url().optional(),
        linkedin: z.url().optional(),
      })
      .optional(),
  }),
})

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  authors: authorsCollection,
}
