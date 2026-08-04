/**
 * 主题配置类型定义
 */
export interface ThemeConfig {
  /** 网站基本信息 */
  site: {
    title: string
    description: string
    author: string
    language: string
  }

  /** 导航配置 */
  navigation: {
    links: Array<{
      text: string
      href: string
      external?: boolean
    }>
  }

  /** 主题外观配置 */
  appearance: {
    /** 默认主题模式 */
    defaultTheme: 'light' | 'dark' | 'system'
    /** 是否允许用户切换主题 */
    themeToggle: boolean
    /** 主色调 */
    primaryColor: string
    /** 强调色 */
    accentColor: string
  }

  /** 排版配置 */
  typography: {
    /** 正文字体 */
    fontFamily: string
    /** 标题字体 */
    headingFontFamily: string
    /** 代码字体 */
    monoFontFamily: string
  }

  /** 博客配置 */
  blog: {
    /** 每页文章数 */
    postsPerPage: number
    /** 是否显示目录 */
    showToc: boolean
    /** 是否显示相关文章 */
    showRelatedPosts: boolean
    /** 是否显示阅读时间 */
    showReadingTime: boolean
  }

  /** 社交链接 */
  social: {
    github?: string
    twitter?: string
    email?: string
    rss?: boolean
  }

  /** 页脚配置 */
  footer: {
    copyright: string
    links?: Array<{
      text: string
      href: string
    }>
  }
}

/**
 * 主题模式类型
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * 默认主题配置
 */
export const themeConfig: ThemeConfig = {
  site: {
    title: '海野味',
    description: '分享技术、想法和生活',
    author: 'ddlg',
    language: 'zh-CN',
  },

  navigation: {
    links: [
      { text: '首页', href: '/' },
      { text: '博客', href: '/posts' },
    ],
  },

  appearance: {
    defaultTheme: 'system',
    themeToggle: true,
    primaryColor: '#3b82f6',
    accentColor: '#8b5cf6',
  },

  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif",
    headingFontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif",
    monoFontFamily: "'Fira Code', 'JetBrains Mono', Consolas, 'Liberation Mono', monospace",
  },

  blog: {
    postsPerPage: 10,
    showToc: true,
    showRelatedPosts: true,
    showReadingTime: true,
  },

  social: {
    github: 'https://github.com/haiyewei',
    rss: true,
  },

  footer: {
    copyright: '© {year} HAIYEWEI.COM. All rights reserved.',
    links: [{ text: 'RSS', href: '/rss.xml' }],
  },
}

export default themeConfig
