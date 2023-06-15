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

server.use(express.static(path.join(path.resolve(), 'public')));

server.get('/', (req, res) => {
  res.send(
    `Write your query or send request on this server.\n
    Main end points are /products, /phones.\n
    Also, you can fetch an image. You can find all the URLs in database`,
  );
});

server.get('/phones', async(req, res) => {
  const phones = await Phone.findAll();

  res.status(200);
  res.send(phones);
});

server.get('/products', async(req, res) => {
  const { page = 1, perPage = 100, productType, sortBy = 'name' } = req.query;
  let allProducts;

  if (!page && !perPage && !sortBy) {
    allProducts = await Product.findAll();
    res.status(200);
    res.send(allProducts);

    return;
  }

  if (productType) {
    allProducts = await Product.findAll({
      where: {
        category: productType,
      },
    });
    res.status(200);
    res.send(allProducts);

    return;
  }

  if (page || perPage || sortBy) {
    const currentPage = Number(page) * Number(perPage) - Number(perPage);

    allProducts = await Product.findAndCountAll({
      order: [[String(sortBy), 'ASC']],
      limit: Number(perPage),
      offset: Number(currentPage),
    });
  }

  res.send(allProducts);
});

server.get('/phones/:id', async(req, res) => {
  const { id } = req.params;

  const foundPhone = await Phone.findByPk(id);

  if (!foundPhone) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundPhone);
});

server.get('/products/:id/recommended', async(req, res) => {
  const { id } = req.params;

  const foundProduct = await Product.findOne({
    where: { itemId: id },
  });

  if (!foundProduct) {
    res.sendStatus(404);

    return;
  }

  const randomIndex = Math.floor(Math.random() * 61) + 1;

  const allProducts = await Product.findAll();

  const recommendedProducts = allProducts.slice(randomIndex, randomIndex + 10);

  res.status(200);
  res.send(recommendedProducts);
});

server.get('/products/new', async(req, res) => {
  const newPhones = await Product.findAll({
    limit: 10,
    order: [['year', 'DESC']],
  });

  res.status(200);
  res.send(newPhones);
});

server.get('/products/discount', async(req, res) => {
  const randomIndex = Math.floor(Math.random() * 61) + 1;

  const allProducts = await Product.findAll();

  const productsWithDiscount = allProducts.slice(randomIndex, randomIndex + 10);

  res.status(200);
  res.send(productsWithDiscount);
});

server.listen(PORT);
