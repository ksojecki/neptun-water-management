/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';

import { getCurrentState } from './api/water';

const app = express();


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/api/water', (req, res) => {
  res.send(getCurrentState());
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
