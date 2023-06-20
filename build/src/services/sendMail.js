"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const emailService_1 = require("./emailService");
(0, emailService_1.send)({
    email: 'pashamalyshkin2003@gmail.com',
    subject: 'Proposition',
    html: `Privet Pasha! Eto Myla. Ti takoy ahuenniy team leader. Priglasi menya na cofee. Chmok-chmok`,
});
