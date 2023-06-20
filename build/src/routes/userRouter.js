"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRouter = express_1.default.Router();
userRouter.get('/', authMiddleware_1.default.addMiddleware, userController_1.default.getAllActive);
exports.default = {
    userRouter,
};
