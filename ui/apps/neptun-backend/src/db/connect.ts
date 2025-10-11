import { MongoClient } from 'mongodb';

export function createClient(url: string, username: string, password: string): MongoClient{
  return new MongoClient(url, { auth: {
      username: username,
      password: password
    }
  });
}
