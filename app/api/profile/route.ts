import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { redis } from "@/lib/redis";

export async function GET() {
  const session = await getSession();
  const sid = session.sid;
  const username = session.username;

  if (!sid) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  const user = await redis.hgetall(`session:${sid}`);

  if (!user?.userId) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  return NextResponse.json({ loggedIn: true, user: { ...user, username } });
}
