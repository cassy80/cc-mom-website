# 给Claude Code的快速指南

## 📁 项目位置
```
C:\Users\Cassy\.openclaw\workspace\cc-mom-website
```

## 🚀 启动命令
```bash
cd C:\Users\Cassy\.openclaw\workspace\cc-mom-website
npm run dev
```

## 📋 优先级任务

### 🔴 最高优先级
1. **小红书页面完善**
   - 创建笔记数据文件：`content/xiaohongshu-notes.json`
   - 参考：`C:\Users\Cassy\.openclaw\workspace\content\xiaohongshu-topics.md`
   - 实现20篇笔记的列表展示和分类筛选

2. **"关注我"区块**
   - 文案："我在小红书收获了13.6万次赞与收藏，来看看我的主页>>"
   - 链接：https://xhslink.com/m/3r4oe1rEzdJ
   - 添加微信视频号二维码

### 🟡 中优先级
3. **联系方式整合**
   - 邮箱：happyccmum@qq.com
   - 更新关于我页面

4. **文章系统**
   - 创建文章列表页：`app/articles/page.tsx`
   - 创建文章详情页：`app/articles/[id]/page.tsx`

### 🟢 低优先级
5. **SEO优化**
   - 添加Schema.org标记
   - 优化meta标签

## 📂 重要文件位置

| 功能 | 文件路径 |
|------|---------|
| 首页 | `app/page.tsx` |
| 关于我 | `app/about/page.tsx` |
| 小红书 | `app/xiaohongshu/page.tsx` |
| 工具组件 | `components/tools-grid.tsx` |
| Logo文件夹 | `public/images/` |
| 小红书选题 | `C:\Users\Cassy\.openclaw\workspace\content\xiaohongshu-topics.md` |
| 交接文档 | `CLAUDE_CODE_交接文档.md` |

## 🎨 设计规范
- 主色：#2563EB（专业蓝）
- 字体：Noto Sans SC（中文） + Inter（英文）
- 响应式设计（移动端优先）

## ✅ 已完成
- Next.js 16 + Tailwind CSS + TypeScript 框架
- 首页 + 关于我页面
- 常用工具展示（豆包、ChatGPT、Kimi、DeepSeek、Gemini等）
- 所有logo和头像已配置

## 🎯 网站目标
- 域名：ccma-ai.com
- 定位：AI+教育垂直赛道最强博主
- 受众：关注AI教育的家长和教育工作者

---

**详细文档：** `CLAUDE_CODE_交接文档.md`
