// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import expressiveCode from 'astro-expressive-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  // 网站 URL（用于生成 sitemap 和 RSS）
  site: 'https://example.com',

  // Markdown 配置
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'wrap',  // 整个标题成为链接，不需要额外的 # 符号
        properties: {
          className: ['heading-link'],
          ariaLabel: '链接到此标题'
        }
      }],
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['external-link-icon'] },
          children: []
        },
        contentProperties: { className: ['external-link-icon-wrapper'] }
      }]
    ],
  },
  
  integrations: [
    // expressiveCode 必须放在 mdx 之前
    expressiveCode({
      // 主题配置：支持深色和浅色主题
      themes: ['github-dark', 'github-light'],
      // 主题选择器：根据 :root 的 class 切换主题
      // 项目使用 :root.light 和 :root.dark 类名
      themeCssSelector: (theme) => {
        if (theme.type === 'light') {
          // 浅色主题：默认状态或明确设置为 light
          return ':root:not(.dark)';
        }
        // 深色主题：设置为 dark 类
        return ':root.dark';
      },
      // 样式覆盖：适配 Material Design 3 主题
      styleOverrides: {
        // 圆角
        borderRadius: 'var(--radius-md)',
        // 边框宽度
        borderWidth: '1px',
        // 边框颜色
        borderColor: 'var(--md-outline-variant)',
        // 代码背景色
        codeBackground: 'var(--md-surface-container)',
        // 代码字体
        codeFontFamily: 'var(--font-mono)',
        // 代码字体大小
        codeFontSize: 'var(--text-sm)',
        // 代码行高
        codeLineHeight: 'var(--leading-relaxed)',
        // 代码内边距
        codePaddingBlock: 'var(--space-4)',
        codePaddingInline: 'var(--space-4)',
        // 框架样式
        frames: {
          // 框架阴影
          frameBoxShadowCssValue: 'var(--shadow-md)',
          // 终端标题栏背景
          terminalTitlebarBackground: 'var(--md-surface-container-high)',
          // 终端标题栏边框
          terminalTitlebarBorderBottomColor: 'var(--md-outline-variant)',
          // 终端背景
          terminalBackground: 'var(--md-surface-container)',
          // 编辑器标题栏背景
          editorTabBarBackground: 'var(--md-surface-container)',
          // 编辑器标题栏边框底部
          editorTabBarBorderBottomColor: 'var(--md-outline-variant)',
          // 活动标签背景
          editorActiveTabBackground: 'var(--md-surface-container-highest)',
          // 活动标签指示器顶部颜色
          editorActiveTabIndicatorTopColor: 'var(--md-primary)',
          // 活动标签指示器底部颜色
          editorActiveTabIndicatorBottomColor: 'transparent',
          // 工具提示背景
          tooltipSuccessBackground: 'var(--md-tertiary-container)',
          tooltipSuccessForeground: 'var(--md-on-tertiary-container)',
        },
        // 文本标记样式
        textMarkers: {
          // 标记边框不透明度
          borderOpacity: '50%',
          // 标记背景不透明度
          backgroundOpacity: '20%',
        },
      },
    }),
    mdx(),
    sitemap({
      // 自定义 sitemap 配置
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // 过滤不需要包含在 sitemap 中的页面
      filter: (page) => !page.includes('/api/'),
    }),
    icon({
      include: {
        'material-symbols': ['*'], // 加载所有 Material Symbols 图标
        'mdi': ['github', 'twitter'], // 加载 MDI 图标（用于社交链接）
      },
    }),
  ],
});