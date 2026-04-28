import { getCloudflareContext } from "@opennextjs/cloudflare";

export type CloudflareEnv = {
  TFM_DB: D1Database;
};

export async function getEnv(): Promise<CloudflareEnv> {
  try {
    const ctx = await getCloudflareContext({ async: true });
    return ctx.env as CloudflareEnv;
  } catch {
    const ctx = getCloudflareContext();
    return ctx.env as CloudflareEnv;
  }
}
