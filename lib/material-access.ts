import { readFileSync } from "node:fs";
import path from "node:path";

type AccessRecord = { id: string; active: boolean; label?: string };

function accessFile() {
  return process.env.MATERIALS_ACCESS_FILE || path.join(process.cwd(), "data", "material-access.json");
}

export function hasMaterialAccess(id: string) {
  try {
    const parsed: unknown = JSON.parse(readFileSync(accessFile(), "utf8"));
    return Array.isArray(parsed) && parsed.some((item) => {
      const record = item as AccessRecord;
      return record.id === id && record.active === true;
    });
  } catch {
    return false;
  }
}
