import {redis} from "@/lib/redis";

export async function GET(){
    const ids = await redis.zrevrange("posts:all", 0, 9);

    const posts = await Promise.all(
        ids.map( async(id) => {
            const data = await redis.hgetall(`post:${id}`);
            console.log('data: ', data);
            return {
                id,
                ...data
            };
        })
    );

    return new Response(JSON.stringify(posts)); 
}