/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { dbinit } from './utils/dbinit';

const PORT = process.env.PORT || 3000;

const server = express();

console.log();

dbinit();

server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello world');
});

server.listen(PORT);
