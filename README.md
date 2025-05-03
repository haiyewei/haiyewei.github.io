# Hexo博客使用指南

## 目录
- [Hexo简介](#hexo简介)
- [安装和初始化](#安装和初始化)
- [基本命令](#基本命令)
- [文章管理](#文章管理)
  - [创建新文章](#创建新文章)
  - [文章前置配置](#文章前置配置)
  - [草稿和发布](#草稿和发布)
- [Markdown语法指南](#markdown语法指南)
  - [标题](#标题)
  - [段落和换行](#段落和换行)
  - [强调（粗体和斜体）](#强调粗体和斜体)
  - [列表](#列表)
  - [链接](#链接)
  - [图片](#图片)
  - [表格](#表格)
  - [代码块](#代码块)
  - [引用](#引用)
  - [分割线](#分割线)
  - [转义字符](#转义字符)
  - [HTML](#html)
- [Hexo特有的标记](#hexo特有的标记)
  - [引用文章](#引用文章)
  - [引用资源](#引用资源)
  - [代码块高亮](#代码块高亮)
  - [标签插件](#标签插件)

## Hexo简介

Hexo是一个快速、简洁且高效的博客框架。使用Markdown（或其他渲染引擎）解析文章，Hexo能在几秒内生成带有精美主题的静态网站。

## 安装和初始化

1. 安装Hexo：
```bash
npm install -g hexo-cli
```

2. 初始化博客：
```bash
hexo init <folder>
cd <folder>
npm install
```

## 基本命令

```bash
# 创建新文章
hexo new [layout] <title>

# 生成静态文件
hexo generate (hexo g)

# 启动本地服务器
hexo server (hexo s)

# 部署网站
hexo deploy (hexo d)

# 清除缓存文件和已生成的静态文件
hexo clean
```

## 文章管理

### 创建新文章

```bash
hexo new "文章标题"
```

这将会在 `source/_posts` 目录下创建一个新的 Markdown 文件。

### 文章前置配置

每篇文章开头都应包含前置信息（Front-matter），采用YAML或JSON格式：

```yaml
---
title: 文章标题
date: 2023-05-13 12:30:00
updated: 2023-05-14 09:15:00
tags:
  - 标签1
  - 标签2
categories:
  - 分类1
  - 分类2
permalink: custom-url
comments: true
---
```

常用前置参数：
- `title`: 文章标题
- `date`: 创建日期
- `updated`: 更新日期
- `tags`: 标签（可设置多个）
- `categories`: 分类（可设置多个）
- `permalink`: 自定义文章链接
- `comments`: 是否开启评论
- `layout`: 布局
- `description`: 文章描述
- `keywords`: 关键字
- `top`: 是否置顶

### 草稿和发布

1. 创建草稿：
```bash
hexo new draft "草稿标题"
```

2. 预览草稿：
```bash
hexo server --draft
```

3. 发布草稿：
```bash
hexo publish [layout] <title>
```

## Markdown语法指南

### 标题

Markdown支持六级标题：

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 段落和换行

段落由一个或多个空行分隔。在行末添加两个或更多空格再回车表示换行。

```markdown
这是第一段。

这是第二段。

这行末尾有两个空格  
所以这是新的一行，但属于同一段落。
```

### 强调（粗体和斜体）

```markdown
*斜体文本* 或 _斜体文本_
**粗体文本** 或 __粗体文本__
***粗斜体文本*** 或 ___粗斜体文本___
~~删除线~~
```

### 列表

无序列表：
```markdown
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2
- 项目3

* 项目1
* 项目2

+ 项目1
+ 项目2
```

有序列表：
```markdown
1. 第一项
2. 第二项
3. 第三项
```

任务列表：
```markdown
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项
```

### 链接

```markdown
[链接文本](https://www.example.com "可选标题")
<https://www.example.com>
```

参考式链接：
```markdown
这是 [参考式链接][id]。

[id]: https://www.example.com "可选标题"
```

### 图片

```markdown
![替代文本](图片URL "可选标题")
```

参考式图片链接：
```markdown
![替代文本][id]

[id]: 图片URL "可选标题"
```

### 表格

```markdown
| 表头1 | 表头2 | 表头3 |
|------|:----:|------:|
| 默认对齐 | 居中对齐 | 右对齐 |
| 内容 | 内容 | 内容 |
```

效果：

| 表头1 | 表头2 | 表头3 |
|------|:----:|------:|
| 默认对齐 | 居中对齐 | 右对齐 |
| 内容 | 内容 | 内容 |

### 代码块

行内代码：
```markdown
这是 `行内代码` 示例
```

代码块：
````markdown
```语言
代码内容
```
````

例如：
````markdown
```javascript
function greeting() {
  console.log("Hello, world!");
}
```
````

### 引用

```markdown
> 这是引用的内容
> 
> > 这是嵌套引用
```

### 分割线

```markdown
---
***
___
```

### 转义字符

使用反斜杠可以转义特殊字符：

```markdown
\* 这不是斜体 \*
```

### HTML

Markdown支持直接使用HTML：

```markdown
<div style="color: red;">
  这是一个红色的div
</div>
```

## Hexo特有的标记

### 引用文章

```markdown
{% post_link 文章文件名 [文章标题] %}
```

### 引用资源

```markdown
{% asset_path 文件名 %}
{% asset_img 文件名 [标题] %}
{% asset_link 文件名 [标题] %}
```

### 代码块高亮

````markdown
```javascript
var foo = 'bar';
console.log(foo);
```
````

还可以添加额外选项：

````markdown
```javascript line_number:false
var foo = 'bar';
console.log(foo);
```
````

### 标签插件

Hexo提供了更丰富的标签插件语法，例如：

1. 引用块：
```
{% blockquote [作者], [来源] [链接] [标题] %}
内容
{% endblockquote %}
```

2. 代码块：
```
{% codeblock [标题] [lang:语言] [url] [link_text] %}
代码内容
{% endcodeblock %}
```

3. 引用链接中的图片：
```
{% img [class names] /path/to/image [width] [height] [title text [alt text]] %}
```

4. 链接：
```
{% link 文本 地址 [外部链接] [标题] %}
```

5. 包含其他文件：
```
{% include [布局] 文件路径 %}
```

更多信息请参考 [Hexo官方文档](https://hexo.io/zh-cn/docs/)。 