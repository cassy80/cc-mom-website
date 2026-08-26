import { promises as fs } from "node:fs";
import path from "node:path";

export type MaterialAccessStat = {
  openCount: number;
  firstOpenedAt?: string;
  lastOpenedAt?: string;
};

type StatsDatabase = Record<string, MaterialAccessStat>;

function statsFile() {
  return process.env.MATERIALS_ACCESS_STATS_FILE || path.join(process.cwd(), "data", "material-access-stats.json");
}

let writeQueue = Promise.resolve();

async function readStats(): Promise<StatsDatabase> {
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(statsFile(), "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as StatsDatabase : {};
  } catch {
    return {};
  }
}

async function writeStats(stats: StatsDatabase) {
  const file = statsFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(stats, null, 2)}\n`, "utf8");
  await fs.rename(temporaryFile, file);
}

export async function recordMaterialAccessOpen(id: string) {
  writeQueue = writeQueue.then(async () => {
    const stats = await readStats();
    const now = new Date().toISOString();
    const current = stats[id] || { openCount: 0 };
    stats[id] = { openCount: current.openCount + 1, firstOpenedAt: current.firstOpenedAt || now, lastOpenedAt: now };
    await writeStats(stats);
  }).catch(() => undefined);
  await writeQueue;
}

export async function readMaterialAccessStats() {
  return readStats();
}
