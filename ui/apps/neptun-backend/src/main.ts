import express from 'express';

import { getCurrentState } from './api/water';
import { AppSettings } from './settings';
import { prepareDataModel } from './dataModel/dataModel';
import { getMongoConnection } from './db/mongo';
import { allowCorsRequests } from '@neptun/app-toolkit';
import { registerAuthentication } from './api/authentication';

const connection = getMongoConnection(AppSettings)
const model = await prepareDataModel(connection);

const app = express();

app.use(allowCorsRequests, express.json());

registerAuthentication(app, model.users);

app.get('/api/water', (req, res) => {
  res.send(getCurrentState());
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
