"use client";

import { useState } from "react";
import styles from "./reader.module.css";

export default function DownloadButton({ pdfUrl }: { pdfUrl: string }) {
  const [message, setMessage] = useState("");

  const downloadUrl = `${pdfUrl}?download=1`;
  const download = () => setMessage("已交给手机下载器；若没有出现系统提示，请点“在浏览器中打开 PDF”。");

  return <div className={styles.downloadGroup}>
    <a className={styles.download} href={downloadUrl} download="2027上海中考考纲词汇-54组情景默写本.pdf" target="_blank" rel="noreferrer" onClick={download}>下载完整 PDF</a>
    <a className={styles.openBrowser} href={pdfUrl} target="_blank" rel="noreferrer">在浏览器中打开 PDF</a>
    {message && <span className={styles.downloadMessage} role="status">{message}</span>}
  </div>;
}
