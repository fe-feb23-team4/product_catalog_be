"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authRouter = express_1.default.Router();
authRouter.post('/registration', authController_1.default.register);
authRouter.get('/activation/:activationToken', authController_1.default.activate);
authRouter.post('/login', authController_1.default.login);
authRouter.get('/refresh', authController_1.default.refresh);
exports.default = {
    authRouter,
};
