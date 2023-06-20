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
const productService_1 = __importDefault(require("../services/productService"));
const normalizeSortByParam_1 = require("../utils/normalizeSortByParam");
function getProducts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, perPage, productType = 'phones', sortBy } = req.query;
        const [sortParam, order] = (0, normalizeSortByParam_1.normalizeSortByParam)(sortBy);
        if (!page && !perPage) {
            const products = yield productService_1.default.getAllProducts();
            res.status(200);
            res.send(products);
            return;
        }
        if (!page || !perPage || !sortBy) {
            next();
        }
        const paginatedProducts = yield productService_1.default.getProductsWithPagination(page, perPage, productType, sortParam, order);
        res.status(200);
        res.send(paginatedProducts);
    });
}
function getRecommendedProduts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const foundProduct = yield productService_1.default.getProductById(id);
        if (!foundProduct) {
            res.sendStatus(404);
            return;
        }
        const recommendedProducts = yield productService_1.default.getTenRandomProducts();
        res.status(200);
        res.send(recommendedProducts);
    });
}
function getNewestProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newestProducts = yield productService_1.default.getNewestProducts();
        res.status(200);
        res.send(newestProducts);
    });
}
function getProductsWithDiscount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const discountProducts = yield productService_1.default.getTenRandomProducts();
        res.status(200);
        res.send(discountProducts);
    });
}
exports.default = {
    getProducts,
    getRecommendedProduts,
    getNewestProducts,
    getProductsWithDiscount,
};
