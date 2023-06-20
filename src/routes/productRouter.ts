import express from 'express';
import productController from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);

productRouter.get(
  '/:id/recommended',
  productController.getRecommendedProduts,
);

productRouter.get('/new', productController.getNewestProducts);

productRouter.get(
  '/discount',
  productController.getProductsWithDiscount,
);

export default {
  productRouter,
};
