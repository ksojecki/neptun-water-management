import { Db, MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:8081');

export async function connect(): Promise<Db>{
  await client.connect();
  console.log('Connected successfully to server');
  return client.db('neptun');
}
