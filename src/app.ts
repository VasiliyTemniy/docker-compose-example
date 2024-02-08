import express from 'express';
import 'express-async-errors';
import timeRouter from './routers/time.js';
const app = express();

import helmet from 'helmet';
import path from 'path';

const __dirname = path.resolve();

app.use('/', express.static('static'));

app.use(helmet());

app.use(express.json());


// Router http://localhost:3000/time - gives current time once
app.use('/time', timeRouter);


// Static html with websocket script to update time every minute
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './static/index.html'));
});


export default app;