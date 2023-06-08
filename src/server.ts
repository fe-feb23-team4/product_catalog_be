import express from 'express';
import cors from 'cors';
import { dbinit } from './utils/dbinit';

const PORT = process.env.PORT || 3000;

const server = express();

dbinit();

server.use(cors());

server.listen(PORT);
