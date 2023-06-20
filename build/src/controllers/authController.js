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
const userService_1 = __importDefault(require("../services/userService"));
const jwtService_1 = __importDefault(require("../services/jwtService"));
const ApiError_1 = require("../exceptions/ApiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
function validationEmail(email) {
    if (!email) {
        return 'Email is required';
    }
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;
    if (!emailPattern.test(email)) {
        return 'Email is not valid';
    }
}
function validationPassword(password) {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 6) {
        return 'Password should contain at least 6 characters';
    }
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const errors = {
            email: validationEmail(email),
            password: validationPassword(password),
        };
        if (errors.email || errors.password) {
            throw ApiError_1.ApiError.BadRequest('Validation error', errors);
        }
        yield userService_1.default.register({ email, password });
        res.status(201);
        res.send({
            message: 'ok',
        });
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield userService_1.default.getUserByEmail(email);
        if (!user) {
            throw ApiError_1.ApiError.BadRequest('User with such an email does not exist', {
                error: 'User with such an email does not exist',
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw ApiError_1.ApiError.BadRequest('Password is now valid');
        }
        if (password !== user.password) {
            throw ApiError_1.ApiError.Unauthorized();
        }
        sendAuthentication(res, user);
    });
}
function sendAuthentication(res, user) {
    const userData = userService_1.default.normalize(user);
    const accessToken = jwtService_1.default.generateAccessToken(userData);
    const refreshToken = jwtService_1.default.generateRefreshToken(userData);
    res.status(200);
    res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 100,
        httpOnly: true,
    });
    res.send({
        user: userData,
        accessToken,
    });
}
function refresh(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { refreshToken } = req.cookies;
        const userData = jwtService_1.default.validateRefreshToken(refreshToken);
        if (!userData || typeof userData !== 'object' || !userData.email) {
            throw ApiError_1.ApiError.Unauthorized();
        }
        const user = yield userService_1.default.getUserByEmail(userData.email);
        if (!user) {
            throw ApiError_1.ApiError.BadRequest('User is not found');
        }
        sendAuthentication(res, user);
    });
}
function activate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { activationToken } = req.params;
        const user = yield userService_1.default.findUserByActivationToken(activationToken);
        if (!user) {
            res.sendStatus(404);
            return;
        }
        user.activationToken = '';
        yield user.save();
        res.send(user);
    });
}
exports.default = {
    register,
    login,
    refresh,
    activate,
};
