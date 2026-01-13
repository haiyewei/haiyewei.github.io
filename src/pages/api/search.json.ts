import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

/**
 * 搜索结果项类型
 */
interface SearchItem {
  title: string
  description: string
  slug: string
  category?: string
  tags?: string[]
}

/**
 * 生成博客文章的搜索索引
 * 构建时生成静态 JSON 文件
 */
export const GET: APIRoute = async () => {
  // 获取所有已发布的博客文章
  const posts = await getCollection('posts', ({ data }) => {
    return data.draft !== true
  })

  // 构建搜索索引
  const searchIndex: SearchItem[] = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    slug: `post/${post.slug}`,
    category: post.data.category,
    tags: post.data.tags,
  }))

  // 按发布日期排序（最新的在前）
  searchIndex.sort((a, b) => {
    const postA = posts.find((p) => p.slug === a.slug)
    const postB = posts.find((p) => p.slug === b.slug)
    if (!postA || !postB) return 0
    return postB.data.pubDate.getTime() - postA.data.pubDate.getTime()
  })

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // 缓存1小时
    },
  })
}
