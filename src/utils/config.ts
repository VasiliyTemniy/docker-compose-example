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
  username: process.env.REDIS_USERNAME ? process.env.REDIS_USERNAME : undefined,
  password: process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : undefined,
  socket: {
    host: process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1',
    port: Number(process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379),
    tls: false,
    reconnectStrategy: retries => Math.min(retries * 50, 1000)
  },
};

export const redisClient = createClient({ ...redisConfig, database: 0 });