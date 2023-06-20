"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const emailService_1 = require("./emailService");
(0, emailService_1.send)({
    email: 'test@gmail.com',
    subject: 'Proposition',
    html: `Registration link`,
});
