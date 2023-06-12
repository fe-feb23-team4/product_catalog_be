/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { dbinit } from './utils/dbinit';
import dotenv from 'dotenv';
import { Product } from './models/Product';
import { Phone } from './models/Phone';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = express();

dbinit();

server.use(cors());

server.get('/', (req, res) => {
  res.send(
    `Write your query or send request on this server
    Main end points are /products, /phones`,
  );
});

server.get('/products', async(req, res) => {
  const products = await Product.findAll();

  res.status(200);
  res.send(products);
});

server.get('/phones', async(req, res) => {
  const phones = await Phone.findAll();

  res.status(200);
  res.send(phones);
});

server.get('/products/:page/:perPage', async(req, res) => {
  const { page, perPage } = req.params;
  let allProducts;

  if (!page && !perPage) {
    allProducts = await Product.findAll();
    res.status(200);
    res.send(allProducts);

    return;
  }

  allProducts = await Product.findAndCountAll({
    limit: Number(perPage),
    offset: Number(page),
  });
  res.send(allProducts);
});

server.listen(PORT);
