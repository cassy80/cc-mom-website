"use client";

import { useState } from "react";
import styles from "./reader.module.css";

export default function DownloadButton({ pdfUrl }: { pdfUrl: string }) {
  const [message, setMessage] = useState("");

  const downloadUrl = `${pdfUrl}?download=1`;
  const openPdf = () => setMessage("PDF 已打开，请使用浏览器的下载或分享按钮保存文件。");

  return <div className={styles.downloadGroup}>
    <a className={styles.download} href={pdfUrl} target="_blank" rel="noreferrer" onClick={openPdf}>下载完整 PDF</a>
    <a className={styles.openBrowser} href={pdfUrl} target="_blank" rel="noreferrer">在浏览器中打开 PDF</a>
    {message && <span className={styles.downloadMessage} role="status">{message}</span>}
  </div>;
}
