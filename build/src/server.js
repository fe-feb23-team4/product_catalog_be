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
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const server = (0, express_1.default)();
(0, dbinit_1.dbinit)();
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'public')));
server.get('/', (req, res) => {
    res.send(`Write your query or send request on this server.\n
    Main end points are /products, /phones.\n
    Also, you can fetch an image. You can find all the URLs in database/ ${path_1.default.join(path_1.default.resolve(), 'public')}`);
});
server.get('/phones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phones = yield Phone_1.Phone.findAll();
    res.status(200);
    res.send(phones);
}));
server.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, perPage } = req.query;
    let allProducts;
    if (!page && !perPage) {
        allProducts = yield Product_1.Product.findAll();
        res.status(200);
        res.send(allProducts);
        return;
    }
    const currentPage = Number(page) * Number(perPage) - Number(perPage);
    allProducts = yield Product_1.Product.findAndCountAll({
        limit: Number(perPage),
        offset: Number(currentPage),
    });
    res.send(allProducts);
}));
server.listen(PORT);
