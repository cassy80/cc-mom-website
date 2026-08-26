import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { readMaterialAccessStats } from "@/lib/material-access-stats";

type AccessRecord = { id: string; active: boolean; label?: string };

export const dynamic = "force-dynamic";

function authorized(request: NextRequest) {
  const password = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);
}

function accessFile() {
  return process.env.MATERIALS_ACCESS_FILE || path.join(process.cwd(), "data", "material-access.json");
}

function origin() {
  return (process.env.PUBLIC_SITE_URL || "https://ccma-ai.com").replace(/\/$/, "");
}

async function readAccessRecords(): Promise<AccessRecord[]> {
  return JSON.parse(await fs.readFile(accessFile(), "utf8")) as AccessRecord[];
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ message: "需要管理员权限" }, { status: 401 });
  const [records, stats] = await Promise.all([readAccessRecords(), readMaterialAccessStats()]);
  const links = records.filter((item) => item.label?.includes("买家")).map((item, index) => ({
    id: item.id,
    sequence: String(index + 1).padStart(3, "0"),
    label: item.label || "",
    active: item.active,
    url: `${origin()}/materials?k=${encodeURIComponent(item.id)}`,
    ...(stats[item.id] || { openCount: 0 }),
  }));
  return NextResponse.json({ success: true, links, total: links.length });
}
