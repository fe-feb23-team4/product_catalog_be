"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbinit_1 = require("./utils/dbinit");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = require("./models/Product");
const Phone_1 = require("./models/Phone");
const path_1 = __importDefault(require("path"));
const normalizeSortByParam_1 = require("./utils/normalizeSortByParam");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = (0, express_1.default)();
(0, dbinit_1.dbinit)();
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'public')));
server.get('/', (req, res) => {
    res.send(`Write your query or send request on this server.\n
    Main end points are /products, /phones.\n
    Also, you can fetch an image. You can find all the URLs in database`);
});
server.get('/phones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phones = yield Phone_1.Phone.findAll();
    res.status(200);
    res.send(phones);
}));
server.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, perPage, productType = 'phones', sortBy } = req.query;
    const [sortParam, order] = (0, normalizeSortByParam_1.normalizeSortByParam)(sortBy);
    if (!page && !perPage) {
        const products = yield Product_1.Product.findAll({
            where: {
                category: productType,
            },
        });
        res.status(200);
        res.send({ products, count: 71 });
        return;
    }
    const currentPage = Number(page) * Number(perPage) - Number(perPage);
    const { rows, count } = (yield Product_1.Product.findAndCountAll({
        where: {
            category: productType,
        },
        order: [[sortParam, order]],
        limit: Number(perPage),
        offset: Number(currentPage),
    }));
    res.send({ products: rows, count });
}));
server.get('/phones/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundPhone = yield Phone_1.Phone.findByPk(id);
    if (!foundPhone) {
        res.sendStatus(404);
        return;
    }
    res.status(200);
    res.send(foundPhone);
}));
server.get('/products/:id/recommended', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundProduct = yield Product_1.Product.findOne({
        where: { itemId: id },
    });
    if (!foundProduct) {
        res.sendStatus(404);
        return;
    }
    const randomIndex = Math.floor(Math.random() * 61) + 1;
    const allProducts = yield Product_1.Product.findAll();
    const recommendedProducts = allProducts.slice(randomIndex, randomIndex + 10);
    res.status(200);
    res.send(recommendedProducts);
}));
server.get('/products/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPhones = yield Product_1.Product.findAll({
        limit: 10,
        order: [['year', 'DESC']],
    });
    res.status(200);
    res.send(newPhones);
}));
server.get('/products/discount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const randomIndex = Math.floor(Math.random() * 61) + 1;
    const allProducts = yield Product_1.Product.findAll();
    const productsWithDiscount = allProducts.slice(randomIndex, randomIndex + 10);
    res.status(200);
    res.send(productsWithDiscount);
}));
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
});
