import "server-only";

import fs from "node:fs";
import path from "node:path";

const publicDir = path.join(process.cwd(), "public");

export function existsInPublic(publicPath: string): boolean {
  if (!publicPath) return false;
  try {
    return fs.existsSync(path.join(publicDir, publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}

export function filterExisting(paths: Array<string | undefined>): string[] {
  return paths.filter(
    (p): p is string => typeof p === "string" && existsInPublic(p),
  );
}
