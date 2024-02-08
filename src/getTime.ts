import { redisClient } from "./utils/config";

export const getTime = async () => {

  const cachedTime = await redisClient.get('time');

  if (!cachedTime) {

    const time = new Date().toISOString();
    await redisClient.set('time', time, { EX: 10 });

    return time;
  }

  return cachedTime;
};