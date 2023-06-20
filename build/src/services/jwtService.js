"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, String(process.env.JWT_ACCESS_SECRET), {
        expiresIn: '30m',
    });
}
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign(user, String(process.env.JWT_REFRESH_SECRET), {
        expiresIn: '20d',
    });
}
function validateAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, String(process.env.JWT_ACCESS_SECRET));
    }
    catch (_a) {
        return null;
    }
}
function validateRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, String(process.env.JWT_REFRESH_SECRET));
    }
    catch (_a) {
        return null;
    }
}
exports.default = {
    generateAccessToken,
    generateRefreshToken,
    validateAccessToken,
    validateRefreshToken,
};
