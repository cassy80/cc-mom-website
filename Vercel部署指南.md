# Vercel部署完整指南

## 🎉 恭喜！网站构建成功！

您的Next.js网站已经成功构建，现在可以部署到Vercel了。

---

## 📋 准备工作

### 需要的账号
- [x] Vercel账号（免费注册）
- [x] GitHub账号（用于代码托管）

### 网站信息
- 网站名称：CC妈育见AI
- 域名：您已购买的域名

---

## 🚀 部署步骤（5分钟完成）

### 第一步：注册Vercel账号

1. **访问Vercel官网**
   - 网址：https://vercel.com
   - 点击"Sign Up"

2. **选择注册方式**
   - 推荐使用GitHub账号注册（最简单）
   - 或使用邮箱注册

3. **授权GitHub（如果选择GitHub注册）**
   - 点击"Continue with GitHub"
   - 授权Vercel访问您的GitHub

### 第二步：创建GitHub仓库并上传代码

#### 2.1 创建GitHub仓库
1. 登录GitHub
2. 点击右上角"+" → "New repository"
3. 仓库名称：`cc-mom-website`
4. 设置为Public（公开）
5. 不要勾选"Add a README file"
6. 点击"Create repository"

#### 2.2 上传代码到GitHub

**方式A：使用Git命令（推荐）**

在项目目录打开命令行：

```bash
# 初始化git仓库
cd C:\Users\Cassy\.openclaw\workspace\cc-mom-website
git init
git add .
git commit -m "Initial commit: CC妈育见AI网站"
git branch -M main

# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/cc-mom-website.git

# 推送到GitHub
git push -u origin main
```

**方式B：使用GitHub网页上传**

1. 在新创建的仓库页面，点击"uploading an existing file"
2. 将整个项目文件夹拖进去
3. 填写提交信息："Initial commit: CC妈育见AI网站"
4. 点击"Commit changes"

### 第三步：连接Vercel到GitHub

1. **登录Vercel后**
   - 点击"Add New Project"
   - 选择"Import Git Repository"

2. **导入GitHub仓库**
   - Vercel会自动显示您的GitHub仓库
   - 选择`cc-mom-website`仓库
   - 点击"Import"

### 第四步：配置项目设置

Vercel会自动检测Next.js项目并进行配置：

**框架预设**：Next.js
**构建命令**：`npm run build`
**输出目录**：`.next`
**安装命令**：`npm install`

点击"Deploy"开始部署！

### 第五步：等待部署完成

- ⏱️ 部署时间：约2-3分钟
- ✅ 部署成功后会显示：**"Congratulations!"**
- 🌐 您会得到一个临时的Vercel域名，如：`https://cc-mom-website.vercel.app`

---

## 🌐 绑定您的域名（可选）

### 备案前阶段

**注意：**由于域名还未备案，暂时不要绑定到Vercel。

**临时方案：**
- 继续使用Vercel提供的临时域名：`cc-mom-website.vercel.app`
- 这个域名也可以正常访问和被大模型抓取

### 备案完成后

1. **在Vercel添加域名**
   - 进入项目设置 → Settings → Domains
   - 点击"Add Domain"
   - 输入您的域名

2. **配置DNS解析**
   - Vercel会提供DNS配置信息
   - 登录阿里云域名控制台
   - 添加CNAME记录指向Vercel

3. **等待DNS生效**
   - 通常需要10分钟到24小时
   - 生效后您的域名就可以访问网站了

---

## ✅ 部署成功检查清单

部署完成后，访问 `https://cc-mom-website.vercel.app` 检查：

- [ ] 首页正常显示
- [ ] 导航栏链接都能点击
- [ ] 文章列表可以浏览
- [ ] 文章详情页正常显示
- [ ] 小红书精选页正常
- [ ] 关于我页面显示
- [ ] 联系我页面显示
- [ ] 页脚信息完整
- [ ] 移动端显示正常

---

## 🎯 部署后的优化

### 1. 环境变量（如果需要）

如果需要配置环境变量：
1. Vercel项目 → Settings → Environment Variables
2. 添加变量：
   - `NEXT_PUBLIC_SITE_URL`: 您的域名
   - `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics ID（可选）

### 2. 性能监控

Vercel自动提供：
- Analytics（分析）
- Speed Insights（速度洞察）
- Logs（日志）

### 3. 自定义域名（备案后）

备案完成后，在Vercel中：
1. Settings → Domains → Add Domain
2. 输入您的域名
3. 按照Vercel提示配置DNS

---

## 📊 Vercel免费版限制

个人网站使用免费版完全够用：

- ✅ 无限项目
- ✅ 无限部署
- ✅ 100GB带宽/月
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 自动构建和部署

---

## 🔧 常见问题

### Q1：部署失败怎么办？
**A**：
- 检查构建日志，查看具体错误信息
- 确保`package.json`中的脚本正确
- 删除Vercel项目后重新导入

### Q2：如何更新网站？
**A**：
```bash
git add .
git commit -m "Update: 描述更新内容"
git push
```
Vercel会自动检测到推送并重新部署

### Q3：Vercel和阿里云ECS如何选择？
**A**：
- **继续用Vercel**（推荐）：简单、稳定、免费
- **迁移到阿里云ECS**：备案完成后，如果需要更多服务器控制权

### Q4：临时域名可以长期使用吗？
**A**：可以！Vercel提供的临时域名是永久免费的，完全可以继续使用。备案后绑定自定义域名只是为了品牌展示。

---

## 🎊 部署成功后

网站上线后可以做的：

1. **提交到搜索引擎**
   - 百度搜索资源平台：https://ziyuan.baidu.com/
   - Google Search Console：https://search.google.com/search-console

2. **测试网站**
   - 访问所有页面，确保功能正常
   - 在手机上测试移动端显示

3. **开始推广**
   - 在小红书分享网站链接
   - 在社交媒体宣传
   - 让大模型开始抓取和推荐

---

## 📞 需要帮助？

### Vercel文档
- https://vercel.com/docs
- https://vercel.com/docs/deployments/overview

### Next.js文档
- https://nextjs.org/docs/deployment

### 阿里云备案
- 参考`ICP备案指南.md`

---

**恭喜！您的网站即将上线！** 🎉

按照以上步骤操作，5分钟内就能让网站在全球访问！
