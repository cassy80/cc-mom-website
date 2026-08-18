import styles from "./vocabulary.module.css";

export default function VocabularyPage() {
  return <main className={styles.page}>
    <div className={styles.bar}><b>CC 妈育见 AI · 上海初中英语</b><span>产品介绍</span></div>
    <header className={styles.nav}><b>2027 上海考纲词汇</b><span>100天＋中英互译默写</span></header>
    <section className={styles.hero}><div><div className={styles.kicker}>给上海初中生的词汇系统复习</div><h1>孩子不是不会背，<br />而是缺少一个能<strong>读懂</strong>的开始。</h1><p>把考纲词汇放进校园、家庭、旅行、运动与成长情景，先让孩子理解句子，再完成中英互译默写。</p><div className={styles.intro}><b>适合：</b>初二、初三开始系统补全上海中考考纲词汇的孩子。<br /><b>交付：</b>54组情景默写 PDF，支持在线翻看与下载打印。</div></div><img src="/vocabulary/cover.png" alt="2027 上海考纲词汇产品封面" /></section>
    <section className={styles.paper}><div className={styles.wrap}><div className={styles.kicker}>为什么不从 A 到 Z 开始？</div><h2>同一本词汇书，可以有不同的打开方式。</h2><p>家长买的是一份“能陪孩子走完整程”的资料：每一组不止给词义，也给孩子理解、提取和写出的路径。</p><div className={styles.compare}><div><span>传统词表</span><small>按字母顺序排列，容易停在前面的几个字母</small></div><div><b>情景编排</b><small>从孩子经历过的生活出发，让词汇先有意义</small></div><div><span>看英文记中文</span><small>“眼熟”不等于会用，更不等于会写</small></div><div><b>读情景＋双向默写</b><small>把认识单词推进为会写出来、会应用</small></div></div></div></section>
    <section className={styles.wrap + " " + styles.steps}><div><div className={styles.kicker}>每一组的学习流程</div><h2>读情景 → 英译中 → 汉译英</h2></div><div className={styles.stepList}><article><b>01</b><h3>先读句子</h3><p>目标词置于完整场景中，红色、加粗、下划线三重标记，黑白打印也能清楚识别。</p></article><article><b>02</b><h3>确认读懂</h3><p>通过英译中回到句子意思，避免只记住孤立词义。</p></article><article><b>03</b><h3>练习写出</h3><p>完成汉译英默写，建立主动提取能力。</p></article></div></section>
    <section className={styles.paper}><div className={styles.wrap + " " + styles.proof}><img src="/vocabulary/sample-scenario.png" alt="真实 PDF 内页样张" /><div><div className={styles.kicker}>不是示意，是已完成的真实内容</div><h2>让家长看得见，孩子每天练的是什么。</h2><ul><li>54 组真实生活主题</li><li>1785 个主词 + 347 个考纲词组</li><li>108 次中英互译默写训练</li><li>支持在线翻看、下载和打印</li></ul></div></div></section>
    <section className={styles.delivery}><div className={styles.wrap}><div><div className={styles.kicker}>购买后怎么领取？</div><h2>一条专属链接，<br />一次资料密码。</h2><p>通过第三方平台购买后，会收到专属资料链接。首次输入一次资料密码，即可在电脑上逐页阅读完整 PDF，也能直接下载。</p></div><a href="/materials/demo-2027">点击进入</a></div></section>
    <footer>© CC 妈育见 AI 个人版权｜禁止二次售卖</footer>
  </main>;
}
