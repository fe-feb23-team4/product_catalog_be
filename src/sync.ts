import { Product } from './models/Product';
import { Phone } from './models/Phone';
import { dbinit } from './utils/dbinit';
import products from '../public/api/products.json';
import { combinePhones } from '../public/api/phones/combined';

const seedInitData = async() => {
  const allPhones = combinePhones();

  await Phone.bulkCreate(allPhones);
  await Product.bulkCreate(products);
};

const sync = async() => {
  dbinit();
  await Phone.sync({ force: true });

  await Product.sync({ force: true });

  await seedInitData();
};

sync();
