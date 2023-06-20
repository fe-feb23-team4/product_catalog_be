import productService from '../services/productService';
import { normalizeSortByParam } from '../utils/normalizeSortByParam';
import express from 'express';

async function getProducts(
  req: express.Request, res: express.Response, next: express.NextFunction,
) {
  const { page, perPage, productType = 'phones', sortBy } = req.query;

  const [sortParam, order] = normalizeSortByParam(sortBy);

  if (!page && !perPage) {
    const products = await productService.getAllProducts();

    res.status(200);
    res.send(products);

    return;
  }

  if (!page || !perPage || !sortBy) {
    next();
  }

  const paginatedProducts = await productService.getProductsWithPagination(
    page as string,
    perPage as string,
    productType as string,
    sortParam,
    order,
  );

  res.status(200);
  res.send(paginatedProducts);
}

async function getRecommendedProduts(
  req: express.Request, res: express.Response,
) {
  const { id } = req.params;

  const foundProduct = await productService.getProductById(id);

  if (!foundProduct) {
    res.sendStatus(404);

    return;
  }

  const recommendedProducts = await productService.getTenRandomProducts();

  res.status(200);
  res.send(recommendedProducts);
}

async function getNewestProducts(req: express.Request, res: express.Response) {
  const newestProducts = await productService.getNewestProducts();

  res.status(200);
  res.send(newestProducts);
}

async function getProductsWithDiscount(
  req: express.Request, res: express.Response,
) {
  const discountProducts = await productService.getTenRandomProducts();

  res.status(200);
  res.send(discountProducts);
}

export default {
  getProducts,
  getRecommendedProduts,
  getNewestProducts,
  getProductsWithDiscount,
};
