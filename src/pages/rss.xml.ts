/**
 * RSS Feed 页面
 * 生成博客的 RSS 订阅源
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../utils/config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // 获取所有博客文章
  const posts = await getCollection('posts');
  
  // 按发布日期排序（最新的在前）
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0;
    const dateB = b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0;
    return dateB - dateA;
  });

  // 获取网站 URL
  const siteUrl = siteConfig.site.url || context.site?.toString() || 'https://example.com';

  return rss({
    // RSS 频道标题
    title: siteConfig.site.title,
    // RSS 频道描述
    description: siteConfig.site.description,
    // 网站 URL
    site: siteUrl,
    // RSS 项目列表
    items: sortedPosts.map((post) => ({
      // 文章标题
      title: post.data.title,
      // 文章描述
      description: post.data.description || '',
      // 文章发布日期
      pubDate: post.data.pubDate ? new Date(post.data.pubDate) : new Date(),
      // 文章链接
      link: `/post/${post.slug}/`,
      // 文章分类
      categories: post.data.category ? [post.data.category] : [],
      // 文章作者
      author: post.data.author || siteConfig.site.author,
    })),
    // 自定义 XML 命名空间
    customData: `<language>${siteConfig.site.language}</language>`,
  });
}