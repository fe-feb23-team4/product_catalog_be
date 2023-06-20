import express from 'express';
import cors from 'cors';
import { dbinit } from './utils/dbinit';
import dotenv from 'dotenv';
import path from 'path';
import phoneRouter from './routes/phoneRouter';
import productRouter from './routes/productRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();

dbinit();

server.use(cors());

server.use(cookieParser());

server.use(express.json());

server.use(express.static(path.join(path.resolve(), 'public')));

server.get('/', (req, res) => {
  res.send(
    `Write your query or send request on this server.\n
    Main end points are /products, /phones.\n
    Also, you can fetch an image. You can find all the URLs in database`,
  );
});

server.use(authRouter.authRouter);

server.use('/phones', phoneRouter.phoneRouter);

server.use('/products', productRouter.productRouter);

server.use('/users', userRouter.userRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
