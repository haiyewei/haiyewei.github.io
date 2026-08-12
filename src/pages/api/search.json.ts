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
  body?: string
}

/**
 * 辅助函数：剥离 Markdown 格式，提取纯文本以供搜索和显示片段
 */
function stripMarkdown(md: string): string {
  if (!md) return ''
  return md
    // 移除 HTML 标签
    .replace(/<[^>]*>/g, '')
    // 移除代码块
    .replace(/```[\s\S]*?```/g, '')
    // 移除行内代码
    .replace(/`([^`]+)`/g, '$1')
    // 移除图片
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // 移除链接
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // 移除标题标记
    .replace(/^(#+)\s+/gm, '')
    // 移除粗体/斜体/删除线
    .replace(/([*_~]{1,3})(\S.*?)\1/g, '$2')
    // 移除引用
    .replace(/^\s*>\s+/gm, '')
    // 替换多个空白字符/换行为单个空格
    .replace(/\s+/g, ' ')
    .trim()
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
      body: stripMarkdown(post.body || ''),
    }))

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // 缓存1小时
    },
  })
}
