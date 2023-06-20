"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../exceptions/ApiError");
const jwtService_1 = __importDefault(require("../services/jwtService"));
function addMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw ApiError_1.ApiError.Unauthorized();
    }
    const [, accessToken] = authHeader.split(' ');
    if (!accessToken) {
        throw ApiError_1.ApiError.Unauthorized();
    }
    const userData = jwtService_1.default.validateAccessToken(accessToken);
    if (!userData) {
        throw ApiError_1.ApiError.Unauthorized();
    }
    next();
}
exports.default = {
    addMiddleware,
};
