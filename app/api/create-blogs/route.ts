import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import {redis} from "@/lib/redis";
import {v4 as uuidv4} from "uuid";
import { sessionOptions } from "@/lib/session";

export async function POST(req:Request){
  const session = await getIronSession<{ sid?: string, username?: string }>(await cookies(), sessionOptions);
  if (!session.sid) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const {title,content} = await req.json();
  const postId = uuidv4();
  const timestamp = Date.now();

  await redis.hset(`post:${postId}`, {
    id: postId,
    title,
    content,
    author: session.username,
    createdAt: timestamp,
  });

  await redis.zadd("posts:all", timestamp, postId);

  return new Response(JSON.stringify({success:true, id:postId}))
}