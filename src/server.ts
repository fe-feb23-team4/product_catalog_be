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
import fs from 'fs';

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

server.post('/auth', async(req, res) => {
  const { phone_number } = req.body;

  if (!phone_number) {
    res.sendStatus(400);
  }

  const headers = {
    'Authorization': 'Bearer 770fd644f280e853573c9351617694c01412',
    'Content-Type': 'application/json'
  }

  const raw = {
    'phone_number': phone_number,
    'options': {
      'number_length': null,
      'send_result': true,
      'callback_url': 'https://product-catalog-be-s8k7.onrender.com/phoneConfirmed',
      'callback_key': null,
    },
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  const result = await fetch('https://call2fa.rikkicom.net/call_api/call', requestOptions);

  res.status(200);
  res.send(result);
});

server.post('/phoneConfirmed', async(req, res) => {
  const dataPath = path.join(__dirname, 'clientBase.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  jsonData.clients.push(req.body);

  const jsonNewData = JSON.stringify(jsonData);

  fs.writeFileSync(jsonNewData, 'clientBase.json');
});

server.post('/phoneCheck', (req, res) => {
  const { call_id } = req.body;

  const dataPath = path.join(__dirname, 'clientBase.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const jsonData = JSON.parse(rawData);
  let checker = false;

  for (const elem of jsonData.clients) {
    if (elem.call_id === call_id) {
      checker = true;
    }
  }

  if (checker) {
    res.status(200);

    res.send({
      message: 'ok',
    });
  } else {
    res.sendStatus(403);
  }
});

server.use(authRouter.authRouter);

server.use('/phones', phoneRouter.phoneRouter);

server.use('/products', productRouter.productRouter);

server.use('/users', userRouter.userRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
