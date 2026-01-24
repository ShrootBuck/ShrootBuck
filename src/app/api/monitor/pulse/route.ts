import { createHash, randomBytes } from "crypto";
import { env } from "~/env";

export const dynamic = "force-dynamic";

interface PulseResponse {
  t: number;
  h: string;
  p: string;
}

export async function GET() {
  const now = Math.floor(Date.now() / 1000);

  const hash = createHash("sha256")
    .update(`${env.MONITOR_SECRET_KEY}${now}`)
    .digest("hex");

  const padding = randomBytes(1024).toString("hex"); // 1024 bytes -> 2048 hex chars

  const payload: PulseResponse = {
    t: now,
    h: hash,
    p: padding,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
