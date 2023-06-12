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
const Product_1 = require("./models/Product");
const Phone_1 = require("./models/Phone");
const dbinit_1 = require("./utils/dbinit");
const products_json_1 = __importDefault(require("../public/api/products.json"));
const combined_1 = require("../public/api/phones/combined");
const seedInitData = () => __awaiter(void 0, void 0, void 0, function* () {
    const allPhones = (0, combined_1.combinePhones)();
    yield Phone_1.Phone.bulkCreate(allPhones);
    yield Product_1.Product.bulkCreate(products_json_1.default);
});
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dbinit_1.dbinit)();
    yield Phone_1.Phone.sync({ force: true });
    yield Product_1.Product.sync({ force: true });
    yield seedInitData();
});
sync();
