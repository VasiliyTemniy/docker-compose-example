import { PORT } from './utils/config.js';
import app from './app.js';
import http from 'http';
import { logger } from './utils/logger.js';
import { WebSocketServer } from 'ws';
import { getTime } from './getTime.js';

const start = () => {
  logger.info('');
  const server = http.createServer(app);

  const wsServer = new WebSocketServer({ server });

  wsServer.on('connection', (socket) => {
    logger.info('Client connected');
    
    socket.send(getTime());
    
    setInterval(() => {
      socket.send(getTime());
    }, 60000);
  });

  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

start();