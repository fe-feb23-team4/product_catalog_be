"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const productRouter = express_1.default.Router();
productRouter.get('/', productController_1.default.getProducts);
productRouter.get('/:id/recommended', productController_1.default.getRecommendedProduts);
productRouter.get('/new', productController_1.default.getNewestProducts);
productRouter.get('/discount', productController_1.default.getProductsWithDiscount);
exports.default = {
    productRouter,
};
