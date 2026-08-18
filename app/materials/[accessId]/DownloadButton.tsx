"use client";

import { useState } from "react";
import styles from "./reader.module.css";

export default function DownloadButton({ pdfUrl }: { pdfUrl: string }) {
  const [message, setMessage] = useState("");

  const download = async () => {
    setMessage("正在准备下载，请稍候…");
    const slowTimer = window.setTimeout(() => setMessage("文件较大，内置浏览器下载可能较慢；也可以点击“在浏览器中打开”。"), 8_000);
    try {
      const response = await fetch(`${pdfUrl}?download=1`, { cache: "no-store" });
      if (!response.ok) throw new Error("Download request failed");
      const blobUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "2027上海中考考纲词汇-54组情景默写本.pdf";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
      window.clearTimeout(slowTimer);
      setMessage("已触发下载；如果没有出现文件，请点击“在浏览器中打开”。");
    } catch {
      window.clearTimeout(slowTimer);
      setMessage("当前内置浏览器不支持直接下载，请点击“在浏览器中打开”。");
    }
  };

  return <div className={styles.downloadGroup}>
    <button type="button" className={styles.download} onClick={download}>下载完整 PDF</button>
    <a className={styles.openBrowser} href={`${pdfUrl}?download=1`} target="_blank" rel="noreferrer">在浏览器中打开</a>
    {message && <span className={styles.downloadMessage} role="status">{message}</span>}
  </div>;
}
