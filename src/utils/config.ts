import * as dotenv from 'dotenv';

export const isDockerized = process.env.DOCKERIZED === 'true';

dotenv.config({
  override: isDockerized ? false : true
});

export const PORT = process.env.BACKEND_PORT ?
  process.env.BACKEND_PORT :
  '3000';