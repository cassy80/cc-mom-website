import { readFile } from "node:fs/promises";
import { hasMaterialAccess } from "@/lib/material-access";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ accessId: string }> }) {
  const { accessId } = await context.params;
  if (!hasMaterialAccess(accessId)) return new Response("资料链接无效或已停止使用。", { status: 404 });
  const file = process.env.MATERIALS_PDF_PATH || "/var/private-materials/2027-vocabulary-final.pdf";
  try {
    const bytes = await readFile(file);
    const download = new URL(request.url).searchParams.get("download") === "1";
    return new Response(bytes, { headers: {
      "content-type": download ? "application/octet-stream" : "application/pdf",
      "content-length": String(bytes.byteLength),
      "content-disposition": `${download ? "attachment" : "inline"}; filename*=UTF-8''2027%E4%B8%8A%E6%B5%B7%E4%B8%AD%E8%80%83%E8%80%83%E7%BA%B2%E8%AF%8D%E6%B1%87-54%E7%BB%84%E6%83%85%E6%99%AF%E9%BB%98%E5%86%99%E6%9C%AC.pdf`,
      "x-content-type-options": "nosniff",
      "cache-control": "private, no-store",
    }});
  } catch { return new Response("资料文件暂时无法读取。", { status: 503 }); }
}
