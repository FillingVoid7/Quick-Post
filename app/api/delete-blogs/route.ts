import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import {redis} from "@/lib/redis";
import { sessionOptions } from "@/lib/session";

export async function POST(req: Request) {
  const session = await getIronSession<{ sid?: string, username?: string }>(await cookies(), sessionOptions);
  if (!session.sid) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  
  const { id } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ error: "Post ID is required" }), { status: 400 });
  }

  const postExists = await redis.exists(`post:${id}`);
  if (!postExists) {
    return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
  }

  const postData = await redis.hgetall(`post:${id}`);
  if (postData.author !== session.username) {
    return new Response(JSON.stringify({ error: "You can only delete your own posts" }), { status: 403 });
  }

  await redis.del(`post:${id}`);
  
  await redis.zrem("posts:all", id);

  return new Response(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
}