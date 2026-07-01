# CC妈个人网站 - Claude Code交接文档

> 最后更新：2026-03-02
> 项目：CC妈AI教育博主个人品牌网站
> 域名：ccma-ai.com

---

## 📁 项目目录结构

```
cc-mom-website/
├── app/                    # Next.js应用路由和页面
│   ├── about/             # 关于我页面
│   ├── xiaohongshu/       # 小红书页面（待完善）
│   ├── articles/          # 文章列表页（待创建）
│   └── page.tsx           # 首页
│
├── components/            # 可复用组件
│   ├── navbar.tsx        # 导航栏
│   ├── footer.tsx        # 页脚
│   ├── hero.tsx          # 首页Hero区块
│   ├── feature-card.tsx   # 特性卡片
│   ├── article-card.tsx   # 文章卡片
│   ├── tools-grid.tsx    # 常用工具网格 ✅ 已完成
│   └── tool-logo.tsx     # 工具logo组件
│
├── content/              # 内容文件
│   ├── templates/        # 内容模板
│   └── (待添加更多内容)
│
├── public/              # 静态资源
│   └── images/          # 图片资源
│       ├── avatar.jpg    # CC妈头像 ✅
│       ├── doubao.png    # 豆包logo ✅
│       ├── deepseek-logo.webp  # DeepSeek logo ✅
│       ├── gemini.jpeg   # Gemini logo ✅
│       ├── gpt-logo.png  # ChatGPT logo ✅
│       ├── kimi.jfif    # Kimi logo ✅
│       └── trae.jpeg    # Trae logo ✅
│
├── lib/                 # 工具函数（待创建）
├── package.json         # 项目依赖
├── next.config.ts       # Next.js配置
├── tailwind.config.ts   # Tailwind CSS配置
└── tsconfig.json       # TypeScript配置
```

---

## 📋 重要文件清单

### 核心页面文件
| 文件 | 路径 | 状态 | 说明 |
|------|------|------|------|
| 首页 | `app/page.tsx` | ✅ 基础完成 | Hero + 核心区块 + 工具展示 |
| 关于我 | `app/about/page.tsx` | ✅ 已完成 | 个人信息 + 社交链接 |
| 小红书 | `app/xiaohongshu/page.tsx` | ⚠️ 待完善 | 需要展示笔记列表 |
| 文章列表 | `app/articles/page.tsx` | ❌ 待创建 | 文章列表页 |
| 文章详情 | `app/articles/[id]/page.tsx` | ❌ 待创建 | 单篇文章页 |

### 组件文件
| 文件 | 路径 | 状态 | 说明 |
|------|------|------|------|
| 导航栏 | `components/navbar.tsx` | ✅ 完成 | 响应式导航 |
| 页脚 | `components/footer.tsx` | ✅ 完成 | 包含社交链接 |
| Hero区块 | `components/hero.tsx` | ✅ 完成 | 首页主要视觉区块 |
| 工具网格 | `components/tools-grid.tsx` | ✅ 完成 | 常用工具展示 |
| 文章卡片 | `components/article-card.tsx` | ✅ 完成 | 文章列表项 |

### 配置文件
| 文件 | 说明 |
|------|------|
| `next.config.ts` | Next.js框架配置 |
| `tailwind.config.ts` | Tailwind CSS样式配置 |
| `tsconfig.json` | TypeScript配置 |
| `package.json` | 依赖和脚本 |

---

## ✅ 已完成的工作

### 1. 基础架构
- ✅ Next.js 16 + Tailwind CSS + TypeScript
- ✅ 响应式设计（移动端友好）
- ✅ 专业蓝配色方案（#2563EB主色）

### 2. 核心页面
- ✅ 首页（Hero + 核心区块 + 工具展示）
- ✅ 关于我页面（个人信息 + 社交链接）
- ⚠️ 小红书页面（基础框架，需要完善）

### 3. 常用工具区块
- ✅ 入门级工具：豆包、ChatGPT、Kimi、DeepSeek、Gemini
- ✅ 进阶级工具：Trae、Manus、Cursor、Claude Code、Midjourney
- ✅ 所有logo已正确配置

### 4. 图片资源
- ✅ CC妈头像（avatar.jpg）
- ✅ 所有工具logo

### 5. 设计系统
- ✅ Answer-First结构原则
- ✅ Schema.org结构化数据（待添加）

---

## 📝 待办事项清单

### 高优先级 🔴
- [ ] **小红书页面完善**
  - [ ] 创建笔记数据文件（JSON）
  - [ ] 实现笔记列表展示
  - [ ] 添加分类筛选（测评类/提效类/工具类/观点类）
  - [ ] 添加笔记详情页
  - [ ] 集成小红书链接

- [ ] **联系方式页面/区块**
  - [ ] 添加"关注我"区域文案（小红书链接 + 13.6万赞藏）
  - [ ] 添加微信视频号二维码
  - [ ] 联系邮箱：happyccmum@qq.com

### 中优先级 🟡
- [ ] **文章系统**
  - [ ] 创建文章列表页（`app/articles/page.tsx`）
  - [ ] 创建文章详情页（`app/articles/[id]/page.tsx`）
  - [ ] 创建文章数据文件（JSON/Markdown）
  - [ ] 添加文章分类和标签
  - [ ] 实现文章搜索功能

- [ ] **SEO优化**
  - [ ] 添加Schema.org标记（Person, Author, Article）
  - [ ] 优化meta标签
  - [ ] 添加sitemap.xml
  - [ ] 添加robots.txt

- [ ] **内容完善**
  - [ ] 更新首页文章列表为真实内容
  - [ ] 补充关于我页面的详细介绍
  - [ ] 添加GEO优化的案例展示

### 低优先级 🟢
- [ ] **交互功能**
  - [ ] 添加订阅邮箱功能
  - [ ] 添加搜索功能
  - [ ] 添加评论区（如果需要）

- [ ] **性能优化**
  - [ ] 图片优化（使用Next.js Image组件）
  - [ ] 懒加载
  - [ ] 代码分割

---

## 🎨 设计规范

### 配色方案
```css
主色: #2563EB      /* 蓝色 - 专业、信任 */
辅助: #3B82F6      /* 浅蓝 - 亲和 */
强调: #F59E0B      /* 橙色 - 活力 */
背景: #FFFFFF     /* 白色 - 纯净 */
文字: #1E293B     /* 深灰 - 易读 */
边框: #E2E8F0     /* 浅灰 - 柔和 */
```

### 字体
- 中文：Noto Sans SC
- 英文：Inter
- 代码：JetBrains Mono

---

## 🚀 启动命令

```bash
# 进入项目目录
cd C:\Users\Cassy\.openclaw\workspace\cc-mom-website

# 安装依赖（首次）
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

**当前运行端口：** http://localhost:3001（或3000）

---

## 📊 内容策略

### Answer-First结构
所有文章和页面采用"答案优先"结构：
1. **核心答案放在最前面**（直接回答用户问题）
2. **详细解释跟进**（提供背景和细节）
3. **案例/证据支持**（增强可信度）
4. **行动建议结尾**（引导下一步）

### Schema.org标记
必须包含的结构化数据：
- Person（个人身份）
- Author（作者信息）
- Article（文章）
- BreadcrumbList（导航路径）

---

## 📱 社交媒体信息

### 小红书
- **ID：** 498481010
- **主页链接：** https://xhslink.com/m/3r4oe1rEzdJ
- **成就：** 13.6万次赞与收藏

### 联系方式
- **邮箱：** happyccmum@qq.com
- **微信视频号：** 二维码已保存到媒体库（位置待确认）

---

## 🔧 给Claude Code的操作指南

### 第一步：启动开发服务器
```bash
cd C:\Users\Cassy\.openclaw\workspace\cc-mom-website
npm run dev
```

### 第二步：了解当前状态
1. 打开浏览器访问 http://localhost:3001
2. 查看现有页面和组件
3. 了解设计规范和配色方案

### 第三步：按优先级完成任务

#### 优先级1：小红书页面
1. **创建笔记数据文件**
   - 位置：`content/xiaohongshu-notes.json`
   - 参考：`C:\Users\Cassy\.openclaw\workspace\content\xiaohongshu-topics.md`
   - 包含20篇笔记的完整信息

2. **完善小红书页面**
   - 位置：`app/xiaohongshu/page.tsx`
   - 功能：分类筛选 + 笔记列表 + 跳转小红书

3. **添加"关注我"区块**
   - 文案："我在小红书收获了13.6万次赞与收藏，来看看我的主页>>"
   - 链接：https://xhslink.com/m/3r4oe1rEzdJ
   - 二维码：微信视频号二维码（待添加）

#### 优先级2：联系方式整合
1. 更新关于我页面的联系信息
2. 添加微信视频号二维码展示

#### 优先级3：SEO优化
1. 添加Schema.org标记
2. 优化meta标签
3. 创建sitemap.xml

### 第四步：测试和部署
1. 测试所有功能
2. 检查响应式设计
3. 准备部署到Vercel或Netlify

---

## 📝 重要提示

### 关于CC妈
- **姓名：** CC妈（AI+教育博主）
- **身份：** Gemini全球认证教育专家、生成式AI工程师
- **学历：** 澳大利亚大学信息系统IT硕士
- **目标：** 成为AI+教育垂直赛道最强博主

### 网站目标
- **3个月：** 网站上线 + 搜索引擎收录
- **6个月：** 品牌词搜索第一 + 月访问量1000+
- **12个月：** 成为AI+教育垂直领域知名博主

### 核心理念
1. AI不是工具，而是孩子的第二个大脑
2. 拒绝无效内卷，用AI释放家长的双手
3. 在0代码时代，逻辑思维和审美力才是核心竞争力

---

## 🆘 常见问题

### Q1: 如何添加新的页面？
A: 在`app/`目录下创建新的文件夹和`page.tsx`文件，Next.js会自动创建路由。

### Q2: 如何修改样式？
A: 使用Tailwind CSS类名，参考`tailwind.config.ts`中的主题配置。

### Q3: 如何添加新的内容？
A: 可以选择：
- 直接在`app/`目录下创建页面
- 使用JSON数据文件（`content/`目录）
- 使用Markdown文件

### Q4: 如何部署？
A: 推荐使用Vercel（与Next.js最佳集成）或Netlify。

---

## 📞 联系方式

如果Claude Code有任何问题，可以参考：
- `MEMORY.md` - 项目记忆
- `content/xiaohongshu-topics.md` - 小红书选题目录
- `memory/2026-03-02.md` - 今日工作记录

---

**祝Claude Code顺利完成任务！🚀**
