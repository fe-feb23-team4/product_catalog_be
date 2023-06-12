import express from 'express';
import cors from 'cors';
import { dbinit } from './utils/dbinit';
import dotenv from 'dotenv';
import { Product } from './models/Product';
import { Phone } from './models/Phone';
import path from 'path';


dotenv.config();

const PORT = process.env.PORT || 3000;

const server = express();

dbinit();

server.use(cors());

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.send(
    `Write your query or send request on this server.\n
    Main end points are /products, /phones.\n
    Also, you can fetch an image. You can find all the URL in database`,
  );
});

server.get('/phones', async(req, res) => {
  const phones = await Phone.findAll();

  res.status(200);
  res.send(phones);
});

server.get('/products', async(req, res) => {
  const { page, perPage } = req.query;
  let allProducts;

  if (!page && !perPage) {
    allProducts = await Product.findAll();
    res.status(200);
    res.send(allProducts);

    return;
  }

  const currentPage = Number(page) * Number(perPage) - Number(perPage);

  allProducts = await Product.findAndCountAll({
    limit: Number(perPage),
    offset: Number(currentPage),
  });
  res.send(allProducts);
});

server.listen(PORT);
