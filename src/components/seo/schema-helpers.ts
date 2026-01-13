/**
 * JSON-LD 结构化数据辅助函数
 * 用于生成常用的 Schema.org 结构化数据
 */

/**
 * 网站结构化数据选项
 */
export interface WebSiteSchemaOptions {
  name: string;
  url: string;
  description?: string;
  language?: string;
}

/**
 * 文章结构化数据选项
 */
export interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime: Date;
  modifiedTime?: Date;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    url: string;
    logo?: string;
  };
  tags?: string[];
}

/**
 * 博客文章结构化数据选项
 */
export interface BlogPostingSchemaOptions extends ArticleSchemaOptions {
  wordCount?: number;
}

/**
 * 人物结构化数据选项
 */
export interface PersonSchemaOptions {
  name: string;
  url?: string;
  image?: string;
  description?: string;
  sameAs?: string[];
}

/**
 * 组织结构化数据选项
 */
export interface OrganizationSchemaOptions {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

/**
 * 面包屑导航项
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * 生成网站结构化数据
 * @param options 网站选项
 * @returns Schema.org WebSite 数据
 */
export function createWebSiteSchema(options: WebSiteSchemaOptions): Record<string, any> {
  return {
    name: options.name,
    url: options.url,
    description: options.description,
    inLanguage: options.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${options.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 生成文章结构化数据
 * @param options 文章选项
 * @returns Schema.org Article 数据
 */
export function createArticleSchema(options: ArticleSchemaOptions): Record<string, any> {
  const schema: Record<string, any> = {
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.publishedTime.toISOString(),
    dateModified: options.modifiedTime?.toISOString() || options.publishedTime.toISOString(),
    author: {
      '@type': 'Person',
      name: options.author.name,
      url: options.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: options.publisher.name,
      url: options.publisher.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url,
    },
  };

  if (options.image) {
    schema.image = options.image;
  }

  if (options.publisher.logo) {
    schema.publisher.logo = {
      '@type': 'ImageObject',
      url: options.publisher.logo,
    };
  }

  if (options.tags && options.tags.length > 0) {
    schema.keywords = options.tags.join(', ');
  }

  return schema;
}

/**
 * 生成博客文章结构化数据
 * @param options 博客文章选项
 * @returns Schema.org BlogPosting 数据
 */
export function createBlogPostingSchema(options: BlogPostingSchemaOptions): Record<string, any> {
  const schema = createArticleSchema(options);
  
  if (options.wordCount) {
    schema.wordCount = options.wordCount;
  }

  return schema;
}

/**
 * 生成人物结构化数据
 * @param options 人物选项
 * @returns Schema.org Person 数据
 */
export function createPersonSchema(options: PersonSchemaOptions): Record<string, any> {
  const schema: Record<string, any> = {
    name: options.name,
  };

  if (options.url) {
    schema.url = options.url;
  }

  if (options.image) {
    schema.image = options.image;
  }

  if (options.description) {
    schema.description = options.description;
  }

  if (options.sameAs && options.sameAs.length > 0) {
    schema.sameAs = options.sameAs;
  }

  return schema;
}

/**
 * 生成组织结构化数据
 * @param options 组织选项
 * @returns Schema.org Organization 数据
 */
export function createOrganizationSchema(options: OrganizationSchemaOptions): Record<string, any> {
  const schema: Record<string, any> = {
    name: options.name,
    url: options.url,
  };

  if (options.logo) {
    schema.logo = {
      '@type': 'ImageObject',
      url: options.logo,
    };
  }

  if (options.description) {
    schema.description = options.description;
  }

  if (options.sameAs && options.sameAs.length > 0) {
    schema.sameAs = options.sameAs;
  }

  return schema;
}

/**
 * 生成面包屑导航结构化数据
 * @param items 面包屑导航项数组
 * @returns Schema.org BreadcrumbList 数据
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, any> {
  return {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}