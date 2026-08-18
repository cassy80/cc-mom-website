"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import styles from "./reader.module.css";

export default function PdfReader({ pdfUrl }: { pdfUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderRef = useRef<RenderTask | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [readerWidth, setReaderWidth] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const reader = readerRef.current;
    if (!reader) return;
    const updateWidth = () => setReaderWidth(reader.clientWidth);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(reader);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    let loadingTask: ReturnType<typeof import("pdfjs-dist/legacy/build/pdf.mjs")["getDocument"]> | null = null;

    async function loadPdf() {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        loadingTask = pdfjs.getDocument(pdfUrl);
        const document = await loadingTask.promise;
        if (!active) {
          await document.destroy();
          return;
        }
        documentRef.current = document;
        setPageCount(document.numPages);
        setStatus("ready");
      } catch {
        if (active) setStatus("error");
      }
    }

    loadPdf();
    return () => {
      active = false;
      renderRef.current?.cancel();
      documentRef.current?.destroy();
      loadingTask?.destroy();
    };
  }, [pdfUrl]);

  useEffect(() => {
    const document = documentRef.current;
    const canvas = canvasRef.current;
    if (!document || !canvas || !readerWidth || status !== "ready") return;
    const pdfDocument = document;
    const renderCanvas = canvas;
    let active = true;

    async function renderPage() {
      try {
        renderRef.current?.cancel();
        const page = await pdfDocument.getPage(pageNumber);
        if (!active) return;
        const original = page.getViewport({ scale: 1 });
        const cssScale = Math.max(0.35, (readerWidth - 24) / original.width);
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: cssScale * outputScale });
        const context = renderCanvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas is not available");
        renderCanvas.width = Math.floor(viewport.width);
        renderCanvas.height = Math.floor(viewport.height);
        renderCanvas.style.width = `${Math.floor(viewport.width / outputScale)}px`;
        renderCanvas.style.height = `${Math.floor(viewport.height / outputScale)}px`;
        const task = page.render({ canvasContext: context, viewport });
        renderRef.current = task;
        await task.promise;
      } catch (error) {
        if (active && error instanceof Error && error.name !== "RenderingCancelledException") setStatus("error");
      }
    }

    renderPage();
    return () => {
      active = false;
      renderRef.current?.cancel();
    };
  }, [pageNumber, readerWidth, status]);

  const goToPage = (value: number) => setPageNumber(Math.min(Math.max(1, value), pageCount || 1));

  return <div className={styles.reader} ref={readerRef}>
    {status === "loading" && <div className={styles.readerMessage}><b>正在载入完整默写本</b><span>首次打开约需几秒，请稍候。</span></div>}
    {status === "error" && <div className={styles.readerMessage}><b>当前浏览器暂时无法显示资料</b><span>请点击上方“下载完整 PDF”后阅读。</span></div>}
    {status === "ready" && <>
      <div className={styles.readerToolbar}>
        <button type="button" onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber <= 1}>← 上一页</button>
        <label>第 <input aria-label="当前页码" type="number" min="1" max={pageCount} value={pageNumber} onChange={(event) => goToPage(Number(event.target.value))} /> / {pageCount} 页</label>
        <button type="button" onClick={() => goToPage(pageNumber + 1)} disabled={pageNumber >= pageCount}>下一页 →</button>
      </div>
      <div className={styles.canvasWrap}><canvas ref={canvasRef} /></div>
    </>}
  </div>;
}
