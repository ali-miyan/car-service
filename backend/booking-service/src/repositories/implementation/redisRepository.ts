import { IRedisRepository } from "../interfaces";
import Redis, { Redis as RedisClient } from "ioredis";

export class RedisOtpRepository implements IRedisRepository {
  private client: RedisClient;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });

    this.client.on("connect", () => {
      console.log("Connected to Redis");
    });

    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });
  }

  async store(key: string, value: string, ttlSeconds: number): Promise<void> {
    try {
      await this.client.set(key, value, "EX", ttlSeconds);
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new Error("error in db");
    }
  }
}
