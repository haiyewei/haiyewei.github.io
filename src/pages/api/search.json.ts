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

  // 按发布日期排序后构建索引，确保搜索结果默认最新优先
  const searchIndex: SearchItem[] = posts
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      slug: `post/${post.id}`,
      category: post.data.category,
      tags: post.data.tags,
    }))

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // 缓存1小时
    },
  })
}
