import type { RedisClientOptions, RedisFunctions, RedisModules, RedisScripts } from '@redis/client';
import * as dotenv from 'dotenv';
import { createClient } from 'redis';

export const isDockerized = process.env.DOCKERIZED === 'true';

dotenv.config({
  override: isDockerized ? false : true
});

export const PORT = process.env.BACKEND_PORT ?
  process.env.BACKEND_PORT :
  '3000';

const redisConfig: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts> = {
  username: process.env.REDIS_USERNAME as string,
  password: process.env.REDIS_PASSWORD as string,
  socket: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT as string),
    tls: false,
    reconnectStrategy: retries => Math.min(retries * 50, 1000)
  },
};

export const redisClient = createClient({ ...redisConfig, database: 0 });