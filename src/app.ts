import express from 'express';
import 'express-async-errors';
import timeRouter from './routers/time.js';
const app = express();

import helmet from 'helmet';
import path from 'path';
import { isDockerized } from './utils/config.js';
import { changeStaticHtmlPort } from './hack.js';


// Change static html port if to 80 running in docker
if (isDockerized) {
  changeStaticHtmlPort();
}

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