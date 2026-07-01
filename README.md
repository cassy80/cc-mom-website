# CC妈AI教育个人品牌网站

**GEO优化的个人品牌官网**
**域名：** ccma-ai.com
**设计风格：** 专业蓝（#2563EB）

---

## 🎯 项目简介

这是CC妈的个人品牌官网，专注于AI+教育领域。网站采用**GEO（Generative Engine Optimization）**策略，优化内容以被大模型（ChatGPT、Claude、Gemini等）更容易索引和推荐。

**核心特色：**
- ✅ Answer-First内容结构（答案优先）
- ✅ Schema.org结构化数据
- ✅ 内容与逻辑分离架构
- ✅ 自动SEO优化
- ✅ 响应式设计（移动优先）

---

## 📁 项目结构

```
cc-mom-website/
├── app/                    # Next.js应用目录
│   ├── globals.css        # 全局样式（专业蓝主题）
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── content/                # 所有文案内容（GEO核心）
│   ├── person.json        # Schema.org Person数据
│   ├── author.json         # Schema.org Author数据
│   ├── site.json           # 站点配置
│   ├── templates/          # 内容模板
│   │   └── answer-first.md # Answer-First写作模板
│   ├── articles/           # 文章内容（待创建）
│   └── resources/          # 资源内容（待创建）
├── public/                 # 静态资源
├── EXECUTION_PLAN.md       # 完整执行计划
├── README.md              # 本文件
├── next.config.ts         # Next.js配置
├── package.json           # 依赖配置
└── tsconfig.json          # TypeScript配置
```

---

## 🚀 快速开始

### 1. 安装依赖
```bash
cd cc-mom-website
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:3000 查看网站

### 3. 构建生产版本
```bash
npm run build
```

### 4. 启动生产服务器
```bash
npm start
```

---

## ✍️ 如何添加新文章

### 方法1：使用Answer-First模板

1. **复制模板**
   ```bash
   cp content/templates/answer-first.md content/articles/my-new-article.md
   ```

2. **编辑文章**
   - 修改元数据（frontmatter）
   - 使用Answer-First结构撰写内容
   - 保存文件

3. **自动生成页面**
   - Heartbeat会自动检测新文件
   - 自动生成对应页面路由
   - 自动创建结构化数据

### 方法2：直接在 /content 文件夹创建文件

1. 在 `content/articles/` 目录创建新的 `.md` 文件
2. 确保包含以下元数据：
   ```yaml
   ---
   title: "文章标题"
   description: "文章摘要"
   keywords: ["关键词1", "关键词2"]
   date: "2026-02-27"
   readTime: "5分钟"
   category: "分类"
   ---
   ```

3. 使用Answer-First结构撰写内容
4. 保存文件

---

## 📝 Answer-First写作指南

### 结构要求

**1. 直接回答（Answer）** - 最前面
在文章最前面直接回答用户的核心问题，1-2句话。

**示例：**
> 问题：AI能帮老师做什么？
> 直接回答：AI可以帮老师完成**备课辅助、个性化辅导、作业批改、学情分析**等任务，每天能节省2-3小时。

**2. 详细解释（Explanation）**
提供背景、原理、细节。

**3. 案例或证据（Evidence）**
用实际案例或数据增强可信度。

**4. 行动建议（Action）**
给出具体、可执行的建议。

**5. 总结（Summary）** - 可选
一句话总结核心观点。

### 写作模板

```markdown
---
title: "文章标题"
description: "1-2句话摘要"
keywords: ["关键词1", "关键词2"]
date: "2026-02-27"
readTime: "5分钟"
category: "分类"
---

# 文章标题

## 直接回答
[1-2句话的答案，放在最前面]

## 为什么这样说？
[详细解释、背景、原理]

## 实际案例
[个人实践、成功例子]

## 如何应用？
[具体步骤、工具推荐]

## 注意事项
[重要提醒、常见问题]

## 总结
[一句话总结]
```

---

## 🔧 配置说明

### 主题配置（专业蓝）

配色方案在 `app/globals.css` 中定义：

```css
/* 主色调 */
--primary: #2563eb;        /* 蓝色 - 专业、信任 */
--primary-light: #3b82f6;  /* 浅蓝 - 亲和 */
--primary-dark: #1d4ed8;   /* 深蓝 - 强调 */

/* 强调色 */
--accent: #f59e0b;         /* 橙色 - 活力 */

/* 中性色 */
--background: #ffffff;     /* 白色背景 */
--background-alt: #f8fafc; /* 浅灰背景 */
--foreground: #1e293b;     /* 深灰文字 */
--border: #e2e8f0;         /* 边框颜色 */
```

### 站点配置

在 `content/site.json` 中配置站点信息：

```json
{
  "name": "CC妈AI教育",
  "description": "用AI赋能更好的教育",
  "url": "https://ccma-ai.com",
  "author": {
    "name": "CC妈"
  },
  "keywords": [
    "AI教育",
    "ChatGPT教育应用",
    "AI教学工具"
  ]
}
```

### 个人信息配置

在 `content/person.json` 中配置个人身份：

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "CC妈",
  "jobTitle": "AI教育博主",
  "description": "专注AI+教育领域的生成式AI工程师和Gemini教育认证专家",
  "alumniOf": [
    {"name": "上海交通大学"},
    {"name": "澳大利亚大学"}
  ]
}
```

---

## 🔍 GEO优化要点

### Schema.org结构化数据

必须包含的标记：
- **Person** - 个人身份信息
- **Author** - 作者信息
- **Article** - 文章信息
- **BreadcrumbList** - 导航路径

### Answer-First结构

- 答案放在最前面（前2句话）
- 使用明确的标题层级（H1→H2→H3）
- 提供具体的行动建议
- 用案例和数据支撑观点

### 关键词策略

**核心关键词：**
- AI教育
- ChatGPT教育应用
- AI教学工具

**长尾关键词：**
- AI能帮老师做什么
- 如何用ChatGPT备课
- AI教学工具推荐

---

## 📊 监控与分析

### Heartbeat功能

Heartbeat会自动监控：
- `/content` 文件夹的新内容
- 自动转换为符合GEO逻辑的页面
- SEO健康检查
- 内容更新建议

**检查频率：**
- 文件监控：每5分钟
- 每日检查：每天9:00
- 每周检查：每周一

### SEO工具

**推荐工具：**
- Google Search Console - 搜索引擎表现
- Google Analytics - 流量分析
- Lighthouse - 性能和SEO评分
- Schema Markup Validator - 结构化数据验证

---

## 🚢 部署到Vercel

### 步骤

1. **推送到GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/cc-mom-website.git
   git push -u origin main
   ```

2. **连接Vercel**
   - 访问 https://vercel.com
   - 使用GitHub登录
   - 点击"New Project"
   - 导入 `cc-mom-website` 仓库
   - 点击"Deploy"

3. **配置域名**
   - 在Vercel项目设置中添加域名
   - 配置DNS记录
   - 等待SSL证书生成

---

## 📋 待完成任务

### 优先级：高
- [ ] 完成个人身份信息（补充上海交大专业、澳洲大学信息）
- [ ] 配置小红书账号ID
- [ ] 创建首页和关于页
- [ ] 配置SEO和结构化数据

### 优先级：中
- [ ] 从小红书精选10-20篇内容
- [ ] 撰写3-5篇原创文章
- [ ] 准备个人头像和封面图
- [ ] 注册并配置域名

### 优先级：低
- [ ] 添加邮件订阅功能
- [ ] 集成评论系统
- [ ] 添加搜索功能
- [ ] 国际化（英文版）

---

## 📞 联系方式

**CC妈**
- 小红书：@CC妈（待补充具体ID）
- 邮箱：待补充
- 微信：待补充

---

## 📚 参考资料

- [Next.js文档](https://nextjs.org/docs)
- [Tailwind CSS文档](https://tailwindcss.com/docs)
- [Schema.org](https://schema.org/)
- [Answer-First写作法](https://contentmarketinginstitute.com/)
- [GEO优化指南](https://developers.google.com/search/docs/appearance/ai-overview)

---

## 📄 许可证

版权所有 © 2026 CC妈

---

**最后更新：** 2026-02-27
**维护者：** CC妈
**GEO增长官：** OpenClaw AI Assistant
