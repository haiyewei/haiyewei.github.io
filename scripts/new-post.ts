/**
 * 新建博客文章脚本
 * 使用方法: npm run new-post
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { fileURLToPath } from 'node:url';

// 获取项目根目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.join(projectRoot, 'src', 'content', 'posts');

// 默认配置
const DEFAULT_AUTHOR = 'admin';
const CATEGORIES = ['tech', 'life', 'tutorial'];

interface PostData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
}

/**
 * 创建 readline 接口
 */
function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * 异步提问
 */
function question(rl: readline.Interface, prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * 生成文件名 slug
 * 使用日期 + 时间戳格式，避免中文转拼音的复杂性
 */
function generateSlug(title: string): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = now.getTime().toString().slice(-6);
  
  // 尝试从标题中提取英文单词作为 slug 的一部分
  const englishWords = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0)
    .slice(0, 3)
    .join('-');
  
  if (englishWords) {
    return `${dateStr}-${englishWords}`;
  }
  
  return `${dateStr}-${timeStr}`;
}

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * 生成 frontmatter 内容
 */
function generateFrontmatter(data: PostData, pubDate: string): string {
  const lines: string[] = [
    '---',
    `title: "${data.title.replace(/"/g, '\\"')}"`,
    `description: "${data.description.replace(/"/g, '\\"')}"`,
    `pubDate: ${pubDate}`,
    'draft: true',
  ];

  if (data.category) {
    lines.push(`category: "${data.category}"`);
  }

  if (data.tags.length > 0) {
    const tagsStr = data.tags.map(tag => `"${tag.replace(/"/g, '\\"')}"`).join(', ');
    lines.push(`tags: [${tagsStr}]`);
  }

  if (data.author) {
    lines.push(`author: "${data.author}"`);
  }

  lines.push('---');
  
  return lines.join('\n');
}

/**
 * 生成完整的文章内容
 */
function generatePostContent(data: PostData, pubDate: string): string {
  const frontmatter = generateFrontmatter(data, pubDate);
  return `${frontmatter}

在这里开始写作...
`;
}

/**
 * 检查文件是否存在
 */
function fileExists(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * 确保目录存在
 */
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  console.log('\n📝 创建新博客文章\n');
  console.log('=' .repeat(40));
  
  const rl = createReadlineInterface();

  try {
    // 1. 获取文章标题（必填）
    let title = '';
    while (!title) {
      title = await question(rl, '文章标题 (必填): ');
      if (!title) {
        console.log('❌ 标题不能为空，请重新输入');
      }
    }

    // 2. 获取文章描述（可选）
    const description = await question(rl, '文章描述 (可选): ') || '';

    // 3. 获取分类（可选）
    console.log(`可用分类: ${CATEGORIES.join(', ')}`);
    const category = await question(rl, '分类 (可选): ') || '';

    // 4. 获取标签（可选，逗号分隔）
    const tagsInput = await question(rl, '标签 (可选，逗号分隔): ');
    const tags = tagsInput
      ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    // 5. 获取作者 ID（可选）
    const author = await question(rl, `作者 ID (可选，默认: ${DEFAULT_AUTHOR}): `) || DEFAULT_AUTHOR;

    // 关闭 readline
    rl.close();

    // 生成文件名和路径
    const slug = generateSlug(title);
    const fileName = `${slug}.md`;
    const filePath = path.join(postsDir, fileName);

    // 检查文件是否已存在
    if (fileExists(filePath)) {
      console.log(`\n❌ 文件已存在: ${filePath}`);
      console.log('请稍后重试或手动修改文件名');
      process.exit(1);
    }

    // 确保目录存在
    ensureDirectoryExists(postsDir);

    // 生成文章内容
    const pubDate = formatDate(new Date());
    const postData: PostData = {
      title,
      description,
      category,
      tags,
      author,
    };
    const content = generatePostContent(postData, pubDate);

    // 写入文件
    fs.writeFileSync(filePath, content, 'utf-8');

    // 输出成功信息
    console.log('\n' + '=' .repeat(40));
    console.log('✅ 文章创建成功！\n');
    console.log(`📄 文件路径: ${path.relative(projectRoot, filePath)}`);
    console.log(`📝 标题: ${title}`);
    if (description) console.log(`📋 描述: ${description}`);
    if (category) console.log(`📁 分类: ${category}`);
    if (tags.length > 0) console.log(`🏷️  标签: ${tags.join(', ')}`);
    console.log(`👤 作者: ${author}`);
    console.log(`📅 发布日期: ${pubDate}`);
    console.log(`📝 状态: 草稿`);
    console.log('\n提示: 文章默认为草稿状态，发布时请将 draft 改为 false');
    console.log('=' .repeat(40) + '\n');

  } catch (error) {
    rl.close();
    console.error('\n❌ 创建文章时出错:', error);
    process.exit(1);
  }
}

// 运行主函数
main();