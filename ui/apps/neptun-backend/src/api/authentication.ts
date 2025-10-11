import { Express } from 'express';
import { Collection } from 'mongodb';
import { hashPassword } from '../dataModel/users';
import { AuthCredentials, User } from '@neptun/data-model';

const tokenList = new Map<string, number>();

export function registerAuthentication(app: Express, users: Collection<User>) {
  app.post('/api/authenticate', async (req, res) => {
    const credentials = hashPassword(req.body as AuthCredentials);
    const user = await users.findOne(credentials);
    if (!user) {
      res.status(401).json({ error: 'unauthorized', message: 'Invalid credentials' });
      return;
    }
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    tokenList.set(token, Date.now() + 1000 * 60 * 60);
    res.json({ token });
  });
}
