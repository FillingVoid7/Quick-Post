//redis client
import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1", 
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    reconnectOnError: (err) => {
        const targetError = "READONLY";
        return err.message.includes(targetError);
    }
})