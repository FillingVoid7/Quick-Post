import { NextResponse } from "next/server";
import {redis} from "@/lib/redis";
import {v4 as uuidv4} from "uuid";
import { getSession } from "@/lib/session";

export async function POST(req:Request){
    const body = await req.json();
    const {username, password} = body; 

    if(username !== "bhuwan" || password !== "123456"){
        return NextResponse.json("Invalid username or password", {status: 400});
    }
    
    //create session ID
    const sid = uuidv4();

    //store session data in redis hash
    await redis.hset(`session:${sid}`, {
        userId : '7', 
        username,
        isLoggedIn: true, 
    });

    await redis.expire(`session:${sid}`, 60 * 60 * 24); 

    //set cookie with session ID 
    const session = await getSession();
    session.sid = sid ; 
    session.username = username;
    await session.save(); 

    return NextResponse.json({ message: "Login successful" });
}