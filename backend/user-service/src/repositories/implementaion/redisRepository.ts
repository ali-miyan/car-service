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

  async storeOtp(email: string, otp: string, ttlSeconds: number): Promise<void> {
    await this.client.set(email, otp, 'EX', ttlSeconds);
  }

  async getOtp(email: string): Promise<string | null> {
    return await this.client.get(email);
  }

  async deleteOtp(email: string): Promise<void> {
    await this.client.del(email);
  }
}
