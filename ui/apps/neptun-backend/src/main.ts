import express from 'express';

import { allowCorsRequests } from '@neptun/app-toolkit';
import { authentication, useAuthentication } from './api/authentication';
import { getCurrentState } from './api/water';

const app = express();

app.use(allowCorsRequests);
app.use(express.json());

app.use('/api/authentication', authentication);
app.get('/api/state', useAuthentication, (req, res) => {
  res.json(getCurrentState());
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
