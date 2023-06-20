import { Product } from '../models/Product';

async function getProductById(productId: string) {
  const foundProduct = await Product.findOne({
    where: { itemId: productId },
  });

  return foundProduct;
}

async function getAllProducts() {
  const products = await Product.findAll();

  return { products, count: 71 };
}

async function getProductsWithPagination(
  page: string,
  perPage: string,
  productType: string,
  sortParam: string,
  order: string,
) {
  const skipItems = Number(page) * Number(perPage) - Number(perPage);

  const { rows, count } = await Product.findAndCountAll({
    where: {
      category: productType,
    },
    order: [[sortParam, order]],
    limit: Number(perPage),
    offset: Number(skipItems),
  });

  return { products: rows, count };
}

async function getTenRandomProducts() {
  const { products } = await getAllProducts();

  const randomIndex = Math.floor(Math.random() * 61) + 1;

  const randomTenProducts = products.slice(randomIndex, randomIndex + 10);

  return randomTenProducts;
}

async function getNewestProducts() {
  const newestProducts = await Product.findAll({
    limit: 10,
    order: [['year', 'DESC']],
  });

  return newestProducts;
}

export default {
  getProductById,
  getAllProducts,
  getProductsWithPagination,
  getTenRandomProducts,
  getNewestProducts,
};
