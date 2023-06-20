"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phoneController_1 = __importDefault(require("../controllers/phoneController"));
const phoneRouter = express_1.default.Router();
phoneRouter.get('/', phoneController_1.default.getAllPhones);
phoneRouter.get('/:id', phoneController_1.default.getPhoneById);
exports.default = {
    phoneRouter,
};
