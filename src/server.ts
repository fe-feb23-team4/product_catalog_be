import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

const server = express();

server.use(cors());

server.listen(PORT);
