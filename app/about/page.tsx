'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import ToolLogo from '@/components/tool-logo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />

      {/* 页面标题 */}
      <section className="pt-32 pb-12 px-4">
        <div className="container-content">
          <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              首页
            </Link>
            <span>/</span>
            <span className="text-foreground">关于我</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            关于 CC妈育见AI
          </h1>
          <p className="text-xl text-primary font-medium mb-2">
            用 20 年商业逻辑，培养 AI 时代的"首席指挥官"
          </p>
          <p className="text-lg text-foreground-muted max-w-2xl">
            生成式 AI 工程师 | Gemini 全球认证教育专家 | 20 年+ 商业管理经验 | 15 岁与 8 岁双宝妈
          </p>
        </div>
      </section>

      {/* 个人简介 */}
      <section className="py-12 px-4">
        <div className="container-content">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* 左侧：个人照片和信息 */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* 个人照片 */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-1 shadow-2xl">
                  <div className="bg-background rounded-xl aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/avatar.jpg"
                      alt="CC妈 - AI教育博主"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 社交链接 */}
                <div className="bg-white border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    关注我
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://www.xiaohongshu.com/user/profile/498481010"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-foreground-muted hover:text-primary transition-colors"
                    >
                      <span className="text-xl">📱</span>
                      <span>小红书</span>
                    </a>
                    <a
                      href="mailto:contact@ccma-ai.com"
                      className="flex items-center gap-3 text-foreground-muted hover:text-primary transition-colors"
                    >
                      <span className="text-xl">📧</span>
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：详细介绍 */}
            <div className="md:col-span-2 space-y-8">
              {/* 个人简介 */}
              <div className="bg-white border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  🌟 个人简介：从 500 强高管到 AI 育儿实践者
                </h2>
                <div className="space-y-4 text-foreground-muted leading-relaxed">
                  <p>
                    我是<strong className="text-foreground">CC妈</strong>。
                  </p>
                  <p>
                    回想在澳洲攻读信息系统、在全球 500 强企业历练的 20 年里，我一直在处理"效率"。但在家，我也曾是那个为辅导作业气到"心梗"、看着孩子为刷题熬夜而心疼不已的普通妈妈。
                  </p>
                  <p>
                    直到 AI 浪潮袭来，看着 15 岁的儿子和 8 岁的女儿，我突然惊醒：<br />
                    <strong className="text-foreground">未来的入场券，不再是"勤奋的记忆"，而是"驾驭 AI 的深度"。</strong>
                  </p>
                  <p>
                    于是，我选择重新拿起代码，拿下了<strong className="text-foreground">Gemini 全球认证教育专家</strong>资格。我决定把这 20 年攒下的"大厂生存逻辑"，翻译成孩子听得懂的语言：
                  </p>
                  <div className="space-y-2 pl-4 my-4">
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong className="text-foreground">拒绝无效卷：</strong>带着孩子用 AI 提效，把时间还给睡眠和运动。</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong className="text-foreground">从消费者变创造者：</strong>零代码编程手搓益智游戏，在创造中建立自信。</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong className="text-foreground">保护好奇心：</strong>让 AI 成为孩子的"第二大脑"，而非代替思考的"拐杖"。</span>
                    </p>
                  </div>
                  <p>
                    我致力于将复杂的 AI 技术，降维转化为家长和孩子都能轻松上手的实战方案。因为深谙家庭教育的痛点，我的方案从不玩虚的，只有接地气的解决力。
                  </p>
                </div>
              </div>

              {/* 核心理念 */}
              <div className="bg-white border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  💡 我的核心理念：培养 AI 时代的"指挥官"
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">
                        在 AI 时代，<strong className="text-foreground">定义问题比寻找答案更重要，调度资源比亲力亲为更重要。</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">
                        <strong className="text-foreground">记忆力会被取代，但决策力不会；</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">
                        <strong className="text-foreground">执行力会被增强，但审美与同理心永远是人类的护城河。</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">
                        我们不培养只会输入指令的"打字员"，我们培养能够指挥 AI 解决复杂问题的未来领导者。
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border-l-4 border-primary p-4 rounded-r-lg mt-4">
                    <p className="text-foreground font-medium">
                      如果你也厌倦了无效内卷，欢迎加入我的【手搓神器】计划，和我一起用技术给生活松绑。
                    </p>
                  </div>
                </div>
              </div>

              {/* 学术背景 */}
              <div className="bg-white border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  学术背景
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-background-alt rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌏</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        澳洲大学
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        信息系统硕士
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        主修：信息技术、信息系统设计、数据分析
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-background-alt rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💼</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        20年+ 商业经验
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        跨越多个行业和领域
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        项目管理、业务分析、团队领导、数字化转型
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 成就数据 */}
              <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  成就数据
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">100万+</div>
                    <div className="text-sm text-foreground-muted">阅读</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">14万+</div>
                    <div className="text-sm text-foreground-muted">小红书赞藏</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">120+</div>
                    <div className="text-sm text-foreground-muted">精选笔记</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">20年+</div>
                    <div className="text-sm text-foreground-muted">商业经验</div>
                  </div>
                </div>
              </div>

              {/* 专业认证 */}
              <div className="bg-white border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  专业认证
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-lg border border-primary/10">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Gemini 全球认证教育专家
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        谷歌官方认证，致力于将复杂的 AI 技术"降维"为家长和孩子都能上手的实践方法。
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-lg border border-primary/10">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        AI 深度应用实践者
                      </h3>
                      <p className="text-sm text-foreground-muted">
                        精通主流大模型的高阶用法，擅长将 20 年大厂实战逻辑植入 AI 工具，带孩子从"工具使用者"蜕变为"AI 指挥官"。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 擅长领域 */}
              <div className="bg-white border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  擅长领域 | Expertise
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span>🤖</span>
                      AI 主流模型应用
                    </h3>
                    <p className="text-sm text-foreground-muted mb-2">
                      <strong>精通：</strong>豆包、deepseek、ChatGPT、Gemini、Kimi等（Google 认证专家视角）
                    </p>
                    <p className="text-sm text-foreground-muted">
                      <strong>优势：</strong>深谙不同模型的底层逻辑差异，擅长根据任务匹配最合适的"AI 员工"。
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span>📚</span>
                      AI 启发式教育
                    </h3>
                    <p className="text-sm text-foreground-muted mb-2">
                      <strong>核心：</strong>提示词工程 (Prompt Engineering)、AI 提问力培养。
                    </p>
                    <p className="text-sm text-foreground-muted">
                      <strong>实战：</strong>将复杂的学科知识拆解为 AI 互动方案，培养孩子的逻辑思维与审计意识。
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span>⚡</span>
                      零代码提效工具
                    </h3>
                    <p className="text-sm text-foreground-muted mb-2">
                      <strong>擅长：</strong>Claude Code、Trae、Qoder、Coze等。
                    </p>
                    <p className="text-sm text-foreground-muted">
                      <strong>目标：</strong>用技术给生活松绑，实现办公自动化与家庭教育数字化。
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span>👩‍💻</span>
                      职场妈妈成长
                    </h3>
                    <p className="text-sm text-foreground-muted mb-2">
                      <strong>领域：</strong>女性职场提效、个人品牌数字化搭建。
                    </p>
                    <p className="text-sm text-foreground-muted">
                      <strong>使命：</strong>帮助职场女性从低效琐事中解脱，重塑数字时代的职场竞争力。
                    </p>
                  </div>
                </div>
              </div>

              {/* 我能提供什么 */}
              <div className="bg-gradient-to-br from-primary via-primary to-primary-dark rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-white rounded-full"></span>
                  📖 我能提供什么 | What Offer
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span>📖</span>
                      1. 实战专栏与硬核资源
                      <span className="text-xs text-white/60 font-normal ml-2">(Content & Tools)</span>
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      连载"手搓 AI 神器"系列，分享工程师私藏的 Prompt 框架与"避坑"工具清单，把 AI 变成全家的提效外挂。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span>🎓</span>
                      2. AI 场景化实操课
                      <span className="text-xs text-white/60 font-normal ml-2">(Courses)</span>
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      带家长和孩子驾驭工具，从零开发益智游戏与学科提效应用，在实战中培养 AI 时代的"指挥官"逻辑。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span>🔧</span>
                      3. 1对1 数字化方案定制
                      <span className="text-xs text-white/60 font-normal ml-2">(Consulting)</span>
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      针对学科痛点或家庭管理，定制专属的 AI 协作思路与自动化工作流，实现从"盲目刷题"到"高效学习"的跃迁。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span>💡</span>
                      4. 品牌共创与深度测评
                      <span className="text-xs text-white/60 font-normal ml-2">(Collaboration)</span>
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      提供工程师视角的 AI 软硬件测评。欢迎具有实战价值、能真实解决教育/办公痛点的品牌进行商业联动。
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-3">
                  想了解更多？
                </h2>
                <p className="text-white/80 mb-6">
                  查看我的最新文章，获取AI+教育的实践方法和工具推荐
                </p>
                <Link
                  href="/articles"
                  className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-background transition-colors"
                >
                  查看文章
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
