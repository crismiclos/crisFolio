import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

// Sirve la página oculta /portafolio (Portafolio Web 3.0) tal cual,
// sin pasar por el i18n ni por React.
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "portafolio", "index.html");
  const html = await readFile(filePath, "utf-8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
