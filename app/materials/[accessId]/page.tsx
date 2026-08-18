import { notFound } from "next/navigation";
import { hasMaterialAccess } from "@/lib/material-access";
import styles from "./reader.module.css";

export const dynamic = "force-dynamic";

export default async function MaterialsPage({ params }: { params: Promise<{ accessId: string }> }) {
  const { accessId } = await params;
  if (!hasMaterialAccess(accessId)) notFound();
  const pdfUrl = `/api/materials/${encodeURIComponent(accessId)}/pdf`;
  return <main className={styles.page}>
    <header><div><b>2027 上海考纲词汇</b><span>100天＋中英互译默写 · 专属资料页</span></div><a href={`${pdfUrl}?download=1`}>下载完整 PDF</a></header>
    <section><b>电脑阅读提示：</b>可在下方逐页翻看；右上角可下载完整 PDF 后打印或离线使用。</section>
    <iframe src={pdfUrl} title="2027 上海考纲词汇完整 PDF" />
    <footer>© CC 妈育见 AI 个人版权｜仅限购买者本人学习使用，请勿转发专属链接。</footer>
  </main>;
}
