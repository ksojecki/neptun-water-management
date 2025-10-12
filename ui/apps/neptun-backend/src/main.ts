import express from 'express';

import { allowCorsRequests } from '@neptun/app-toolkit';
import { authentication } from './api/authentication';

const app = express();

app.use(allowCorsRequests, express.json());

app.use('/api/authentication', authentication);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
