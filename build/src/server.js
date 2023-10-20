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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbinit_1 = require("./utils/dbinit");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const phoneRouter_1 = __importDefault(require("./routes/phoneRouter"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fs_1 = __importDefault(require("fs"));
const got_1 = __importDefault(require("got"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = (0, express_1.default)();
(0, dbinit_1.dbinit)();
server.use((0, cors_1.default)());
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), 'public')));
server.get('/', (req, res) => {
    res.send(`Write your query or send request on this server.\n
    Main end points are /products, /phones.\n
    Also, you can fetch an image. You can find all the URLs in database`);
});
server.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone_number } = req.body;
    if (!phone_number) {
        res.sendStatus(400);
    }
    const headers = {
        'Authorization': 'Bearer 770fd644f280e853573c9351617694c01412',
        'Content-Type': 'application/json'
    };
    const raw = {
        'phone_number': phone_number,
        'options': {
            'number_length': null,
            'send_result': true,
            'callback_url': 'https://product-catalog-be-s8k7.onrender.com/phoneConfirmed',
            'callback_key': null,
        },
    };
    try {
        const response = yield got_1.default.post('https://call2fa.rikkicom.net/call_api/call', {
            headers: headers,
            json: raw,
            responseType: 'json',
        }).json();
        res.status(200);
        res.send(response);
    }
    catch (error) {
        res.sendStatus(401);
    }
}));
server.post('/phoneConfirmed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataPath = path_1.default.join(__dirname, 'clientBase.json');
    const rawData = fs_1.default.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    jsonData.clients.push(req.body);
    const jsonNewData = JSON.stringify(jsonData);
    fs_1.default.writeFileSync(jsonNewData, 'clientBase.json');
}));
server.post('/phoneCheck', (req, res) => {
    const { call_id } = req.body;
    const dataPath = path_1.default.join(__dirname, 'clientBase.json');
    const rawData = fs_1.default.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    let checker = false;
    for (const elem of jsonData.clients) {
        if (elem.call_id === call_id) {
            checker = true;
        }
    }
    if (checker) {
        res.status(200);
        res.send({
            message: 'ok',
        });
    }
    else {
        res.sendStatus(403);
    }
});
server.use(authRouter_1.default.authRouter);
server.use('/phones', phoneRouter_1.default.phoneRouter);
server.use('/products', productRouter_1.default.productRouter);
server.use('/users', userRouter_1.default.userRouter);
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
});
