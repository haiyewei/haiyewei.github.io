/**
 * SEO 组件导出
 */

// 导出辅助函数
export {
  createWebSiteSchema,
  createArticleSchema,
  createBlogPostingSchema,
  createPersonSchema,
  createOrganizationSchema,
  createBreadcrumbSchema,
} from './schema-helpers';

// 导出类型
export type {
  WebSiteSchemaOptions,
  ArticleSchemaOptions,
  BlogPostingSchemaOptions,
  PersonSchemaOptions,
  OrganizationSchemaOptions,
  BreadcrumbItem,
} from './schema-helpers';