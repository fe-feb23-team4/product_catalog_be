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
const User_1 = require("../models/User");
const uuid_1 = require("uuid");
const ApiError_1 = require("../exceptions/ApiError");
const emailService_1 = require("./emailService");
const bcrypt_1 = __importDefault(require("bcrypt"));
function register({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield getUserByEmail(email);
        if (existingUser) {
            throw ApiError_1.ApiError.BadRequest('Email is already registered');
        }
        const activationToken = (0, uuid_1.v4)();
        const hash = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.User.create({ email, hash, activationToken });
        yield emailService_1.emailService.sendActivationLink(email, activationToken);
        return user;
    });
}
function findUserByActivationToken(activationToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            where: { activationToken },
        });
        return user;
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            where: {
                email,
            },
        });
        return user;
    });
}
function getAllActive() {
    return __awaiter(this, void 0, void 0, function* () {
        const activeUsers = yield User_1.User.findAll({
            where: {
                activationToken: null,
            },
        });
        return activeUsers;
    });
}
function normalize({ id, email }) {
    return { id, email };
}
exports.default = {
    register,
    findUserByActivationToken,
    getUserByEmail,
    getAllActive,
    normalize,
};
