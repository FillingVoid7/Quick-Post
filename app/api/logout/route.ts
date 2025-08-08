import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  const session = await getSession();
  const sid = session.sid;

  if (sid) {
    await redis.del(`session:${sid}`);
  }

  await session.destroy();

  return NextResponse.json({ success: true });
}
