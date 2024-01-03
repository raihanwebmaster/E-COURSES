import { Redis } from 'ioredis';
import config from '../config';

const redisClient = () => {
  if (config.redis_url) {
    console.log(`Redis connected`);
    return config.redis_url;
  }
  throw new Error('Redis connection failed ');
};

export const redis = new Redis(redisClient())
