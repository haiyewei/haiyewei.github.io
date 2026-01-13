import type { APIRoute } from 'astro';

/**
 * 提供 /sitemap.xml 作为 /sitemap-index.xml 的别名
 *
 * Astro 的 @astrojs/sitemap 集成默认生成 sitemap-index.xml，
 * 此文件提供传统 sitemap.xml URL 的兼容性。
 *
 * 在静态构建模式下，直接读取并返回 sitemap-index.xml 的内容，
 * 确保搜索引擎爬虫能正确解析 XML 格式的 sitemap。
 */

// 获取站点 URL
const siteUrl = import.meta.env.SITE || 'https://example.com';

export const GET: APIRoute = async () => {
  // 生成 sitemap index XML 内容
  // 这与 @astrojs/sitemap 生成的格式一致
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>${siteUrl}/sitemap-0.xml</loc></sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};