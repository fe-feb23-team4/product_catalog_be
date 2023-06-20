"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.sendActivationLink = exports.send = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
function send({ email, subject, html }) {
    return transporter.sendMail({
        from: 'Auth API',
        to: email,
        subject,
        text: '',
        html,
    });
}
exports.send = send;
function sendActivationLink(email, token) {
    const link = `${process.env.CLIENT_URL}/activate/${token}`;
    return send({
        email,
        subject: 'Account activation',
        html: `
    <h1>Account activation</h1>
    <a href="${link}">${link}</a>
  `,
    });
}
exports.sendActivationLink = sendActivationLink;
exports.emailService = { send, sendActivationLink };
