/**
 * 网站配置加载工具
 * 从 YAML 配置文件读取并提供类型安全的配置访问
 */
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

// ============ 类型定义 ============

/** 网站基本信息 */
export interface SiteInfo {
  title: string;
  description: string;
  author: string;
  language: string;
  url: string;
}

/** 导航链接 */
export interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

/** 博客分类 */
export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
}

/** 社交链接 */
export interface SocialLinks {
  github?: string;
  twitter?: string;
  email?: string;
  [key: string]: string | undefined;
}

/** 页脚链接 */
export interface FooterLink {
  name: string;
  href: string;
}

/** 页脚配置 */
export interface FooterConfig {
  copyright: string;
  links: FooterLink[];
}

/** 功能开关 */
export interface Features {
  darkMode: boolean;
  search: boolean;
  comments: boolean;
  analytics: boolean;
}

/** 主题配置 */
export interface ThemeSettings {
  /** 种子颜色 - Material Design 3 会从这个颜色生成完整的调色板 */
  seedColor: string;
}

/** 作者配置 */
export interface Author {
  /** 作者唯一标识 */
  id: string;
  /** 作者名称 */
  name: string;
  /** 邮箱地址 */
  email?: string;
  /** 头像 URL */
  avatar?: string;
  /** 作者简介 */
  bio?: string;
}

/** Hero 区域配置 */
export interface HeroConfig {
  /** 是否启用 hero 区域 */
  enabled: boolean;
  /** 可选标题 */
  title?: string;
  /** 可选副标题 */
  subtitle?: string;
  /** 可选背景图片 URL */
  background?: string;
  /** 是否显示向下滚动指示器 */
  showScrollIndicator?: boolean;
}

/** 帖子布局类型 */
export type PostLayout = 'cms' | 'blog' | 'image-blog';

/** 帖子显示配置 */
export interface PostsConfig {
  /** 布局样式 */
  layout: PostLayout;
  /** 是否显示封面图片 */
  showImage: boolean;
  /** 每页显示数量 */
  postsPerPage: number;
  /** 摘要长度（字符数） */
  excerptLength: number;
}

/** 完整的网站配置 */
export interface SiteConfig {
  site: SiteInfo;
  navigation: NavLink[];
  categories: Category[];
  social: SocialLinks;
  footer: FooterConfig;
  features: Features;
  theme?: ThemeSettings;
  posts?: PostsConfig;
  hero?: HeroConfig;
  authors?: Author[];
}

// ============ 配置加载 ============

/** 配置文件路径 */
const CONFIG_PATH = path.join(process.cwd(), 'src/config/site.yaml');

/** 缓存的配置对象 */
let cachedConfig: SiteConfig | null = null;

/**
 * 加载并解析 YAML 配置文件
 * @returns 解析后的配置对象
 */
function loadConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = yaml.load(fileContents) as SiteConfig;
    
    // 验证必要字段
    if (!config.site || !config.navigation || !config.categories) {
      throw new Error('配置文件缺少必要字段');
    }

    cachedConfig = config;
    return config;
  } catch (error) {
    console.error('加载配置文件失败:', error);
    // 返回默认配置
    return getDefaultConfig();
  }
}

/**
 * 获取默认配置
 * @returns 默认配置对象
 */
function getDefaultConfig(): SiteConfig {
  return {
    site: {
      title: '我的博客',
      description: '分享技术、想法和生活',
      author: 'Author',
      language: 'zh-CN',
      url: 'https://example.com',
    },
    navigation: [
      { name: '首页', href: '/' },
      { name: '博客', href: '/blog' },
    ],
    categories: [
      { slug: 'tech', name: '技术', description: '技术相关文章', color: '#3b82f6' },
      { slug: 'life', name: '生活', description: '生活随笔', color: '#10b981' },
      { slug: 'tutorial', name: '教程', description: '教程和指南', color: '#f59e0b' },
    ],
    social: {
      github: 'https://github.com/username',
      email: 'email@example.com',
    },
    footer: {
      copyright: '© 2026 我的博客',
      links: [
        { name: 'RSS', href: '/rss.xml' },
      ],
    },
    features: {
      darkMode: true,
      search: true,
      comments: false,
      analytics: false,
    },
  };
}

// ============ 导出配置对象 ============

/** 网站配置 */
export const siteConfig: SiteConfig = loadConfig();

// ============ 辅助函数 ============

/**
 * 获取网站基本信息
 * @returns 网站基本信息
 */
export function getSiteInfo(): SiteInfo {
  return siteConfig.site;
}

/**
 * 获取导航链接列表
 * @returns 导航链接数组
 */
export function getNavigation(): NavLink[] {
  return siteConfig.navigation;
}

/**
 * 获取所有分类
 * @returns 分类数组
 */
export function getCategories(): Category[] {
  return siteConfig.categories;
}

/**
 * 根据 slug 获取分类
 * @param slug 分类标识
 * @returns 分类对象，如果未找到则返回 undefined
 */
export function getCategory(slug: string): Category | undefined {
  return siteConfig.categories.find((cat) => cat.slug === slug);
}

/**
 * 获取分类名称
 * @param slug 分类标识
 * @returns 分类名称，如果未找到则返回 slug
 */
export function getCategoryName(slug: string): string {
  const category = getCategory(slug);
  return category ? category.name : slug;
}

/**
 * 获取分类颜色
 * @param slug 分类标识
 * @returns 分类颜色，如果未找到则返回默认颜色
 */
export function getCategoryColor(slug: string): string {
  const category = getCategory(slug);
  return category ? category.color : '#6b7280';
}

/**
 * 获取社交链接
 * @returns 社交链接对象
 */
export function getSocialLinks(): SocialLinks {
  return siteConfig.social;
}

/**
 * 获取页脚配置
 * @returns 页脚配置对象
 */
export function getFooterConfig(): FooterConfig {
  return siteConfig.footer;
}

/**
 * 获取功能开关
 * @returns 功能开关对象
 */
export function getFeatures(): Features {
  return siteConfig.features;
}

/**
 * 检查功能是否启用
 * @param feature 功能名称
 * @returns 是否启用
 */
export function isFeatureEnabled(feature: keyof Features): boolean {
  return siteConfig.features[feature] ?? false;
}

/**
 * 获取版权信息（支持年份占位符）
 * @returns 处理后的版权信息
 */
export function getCopyright(): string {
  const copyright = siteConfig.footer.copyright;
  return copyright.replace('{year}', new Date().getFullYear().toString());
}

/**
 * 获取主题配置
 * @returns 主题配置对象
 */
export function getThemeSettings(): ThemeSettings {
  return siteConfig.theme ?? { seedColor: '#6750A4' };
}

/**
 * 获取种子颜色
 * @returns 种子颜色（十六进制格式）
 */
export function getSeedColor(): string {
  return siteConfig.theme?.seedColor ?? '#6750A4';
}

/**
 * 获取帖子显示配置
 * @returns 帖子显示配置对象
 */
export function getPostsConfig(): PostsConfig {
  return siteConfig.posts ?? getDefaultPostsConfig();
}

/**
 * 获取默认帖子配置
 * @returns 默认帖子配置对象
 */
function getDefaultPostsConfig(): PostsConfig {
  return {
    layout: 'blog',
    showImage: true,
    postsPerPage: 10,
    excerptLength: 150,
  };
}

/**
 * 获取帖子布局类型
 * @returns 布局类型
 */
export function getPostLayout(): PostLayout {
  return siteConfig.posts?.layout ?? 'blog';
}

/**
 * 检查是否显示帖子图片
 * @returns 是否显示图片
 */
export function shouldShowPostImage(): boolean {
  const layout = getPostLayout();
  // image-blog 布局始终显示图片
  if (layout === 'image-blog') return true;
  // cms 布局不显示图片
  if (layout === 'cms') return false;
  // blog 布局根据配置决定
  return siteConfig.posts?.showImage ?? true;
}

/**
 * 获取每页帖子数量
 * @returns 每页帖子数量
 */
export function getPostsPerPage(): number {
  return siteConfig.posts?.postsPerPage ?? 10;
}

/**
 * 获取摘要长度
 * @returns 摘要长度（字符数）
 */
export function getExcerptLength(): number {
  return siteConfig.posts?.excerptLength ?? 150;
}

/**
 * 获取 Hero 区域配置
 * @returns Hero 配置对象
 */
export function getHeroConfig(): HeroConfig {
  return siteConfig.hero ?? getDefaultHeroConfig();
}

/**
 * 获取默认 Hero 配置
 * @returns 默认 Hero 配置对象
 */
function getDefaultHeroConfig(): HeroConfig {
  return {
    enabled: true,
    title: '',
    subtitle: '',
    background: '',
    showScrollIndicator: true,
  };
}

/**
 * 检查 Hero 区域是否启用
 * @returns 是否启用
 */
export function isHeroEnabled(): boolean {
  return siteConfig.hero?.enabled ?? true;
}

// ============ 作者相关函数 ============

/**
 * 获取所有作者
 * @returns 作者数组
 */
export function getAuthors(): Author[] {
  return siteConfig.authors ?? [];
}

/**
 * 根据 ID 获取作者
 * @param id 作者 ID
 * @returns 作者对象，如果未找到则返回 undefined
 */
export function getAuthorById(id: string): Author | undefined {
  return siteConfig.authors?.find((author) => author.id === id);
}

/**
 * 获取作者名称
 * @param id 作者 ID
 * @returns 作者名称，如果未找到则返回 ID
 */
export function getAuthorName(id: string): string {
  const author = getAuthorById(id);
  return author ? author.name : id;
}

/**
 * 获取默认作者（第一个作者）
 * @returns 默认作者，如果没有配置作者则返回 undefined
 */
export function getDefaultAuthor(): Author | undefined {
  const authors = getAuthors();
  return authors.length > 0 ? authors[0] : undefined;
}

// ============ 图片提取工具函数 ============

/**
 * 从 Markdown 内容中提取第一张图片的 URL
 * @param content Markdown 原始内容
 * @returns 图片 URL 或 null
 */
export function extractFirstImage(content: string): string | null {
  // 匹配 Markdown 图片语法: ![alt](url)
  const mdImageRegex = /!\[.*?\]\((.*?)\)/;
  // 匹配 HTML img 标签: <img src="url" />
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i;
  
  const mdMatch = content.match(mdImageRegex);
  if (mdMatch) return mdMatch[1];
  
  const htmlMatch = content.match(htmlImageRegex);
  if (htmlMatch) return htmlMatch[1];
  
  return null;
}

/**
 * 获取文章封面图片
 * @param content Markdown 原始内容
 * @param defaultImage 默认图片 URL
 * @returns 封面图片 URL
 */
export function getCoverImage(content: string, defaultImage: string = '/placeholder-image.svg'): string {
  return extractFirstImage(content) || defaultImage;
}

export default siteConfig;