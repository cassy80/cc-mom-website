import { notFound } from "next/navigation";
import { hasMaterialAccess } from "@/lib/material-access";
import PdfReader from "./[accessId]/PdfReader";
import DownloadButton from "./[accessId]/DownloadButton";
import styles from "./[accessId]/reader.module.css";
import { recordMaterialAccessOpen } from "@/lib/material-access-stats";

export const dynamic = "force-dynamic";

/**
 * One-click buyer link, matching the existing 24-point game's ?k= format.
 * The older /materials/<accessId> address remains available for links that
 * were already issued.
 */
export default async function MaterialsQueryPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string | string[] }>;
}) {
  const { k } = await searchParams;
  const accessId = typeof k === "string" ? k : "";
  if (!accessId || !hasMaterialAccess(accessId)) notFound();
  await recordMaterialAccessOpen(accessId);

  const pdfUrl = `/api/materials/${encodeURIComponent(accessId)}/pdf`;
  return <main className={styles.page}>
    <header><div><b>2027 上海考纲词汇</b><span>100天＋中英互译默写 · 专属资料页</span></div><nav className={styles.actions} aria-label="资料页操作"><a className={styles.home} href="/">返回主页</a><DownloadButton pdfUrl={pdfUrl} /></nav></header>
    <section><b>阅读提示：</b>手机和电脑均可在下方逐页翻看；也可下载完整 PDF 后打印或离线使用。</section>
    <PdfReader pdfUrl={pdfUrl} />
    <footer>© CC 妈育见 AI 个人版权｜仅限购买者本人学习使用，请勿转发专属链接。</footer>
  </main>;
}
