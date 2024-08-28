import { BadRequestError } from "tune-up-library";
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

  async store(email: string, otp: string, ttlSeconds: number): Promise<void> {
    try {
      await this.client.set(email, otp, "EX", ttlSeconds);
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }

  async get(email: string): Promise<string | null> {
    try {
      return await this.client.get(email);
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }

  async delete(email: string): Promise<void> {
    try {
      await this.client.del(email);
    } catch (error) {
      throw new BadRequestError("error in db" + error);
    }
  }
}
