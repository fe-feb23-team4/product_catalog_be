"use strict";
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
server.use(authRouter_1.default.authRouter);
server.use('/phones', phoneRouter_1.default.phoneRouter);
server.use('/products', productRouter_1.default.productRouter);
server.use('/users', userRouter_1.default.userRouter);
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
});
