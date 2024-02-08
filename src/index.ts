import { PORT, redisClient } from './utils/config.js';
import app from './app.js';
import http from 'http';
import { logger } from './utils/logger.js';
import { WebSocketServer } from 'ws';
import { getTime } from './getTime.js';

const start = async () => {

  await redisClient.connect();
  logger.info('Connected to Redis');

  // Flush Redis - for testing if needed. Could be executed based on some env var
  // await redisClient.flushDb();

  const server = http.createServer(app);

  const wsServer = new WebSocketServer({ server });

  wsServer.on('connection', (socket) => {
    logger.info('Client connected');
    
    void (async () => {
      socket.send(await getTime());
    })();
    
    setInterval(() => {
      void (async () => {
        socket.send(await getTime());
      })();
    }, 60000);
  });

  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

await start();