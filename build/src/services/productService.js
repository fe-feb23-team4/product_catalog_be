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
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
function getProductById(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundProduct = yield Product_1.Product.findOne({
            where: { itemId: productId },
        });
        return foundProduct;
    });
}
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield Product_1.Product.findAll();
        return { products, count: 71 };
    });
}
function getProductsWithPagination(page, perPage, productType, sortParam, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const skipItems = Number(page) * Number(perPage) - Number(perPage);
        const { rows, count } = yield Product_1.Product.findAndCountAll({
            where: {
                category: productType,
            },
            order: [[sortParam, order]],
            limit: Number(perPage),
            offset: Number(skipItems),
        });
        return { products: rows, count };
    });
}
function getTenRandomProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { products } = yield getAllProducts();
        const randomIndex = Math.floor(Math.random() * 61) + 1;
        const randomTenProducts = products.slice(randomIndex, randomIndex + 10);
        return randomTenProducts;
    });
}
function getNewestProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const newestProducts = yield Product_1.Product.findAll({
            limit: 10,
            order: [['year', 'DESC']],
        });
        return newestProducts;
    });
}
exports.default = {
    getProductById,
    getAllProducts,
    getProductsWithPagination,
    getTenRandomProducts,
    getNewestProducts,
};
