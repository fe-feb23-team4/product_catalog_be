import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface sendParams {
  email: string,
  subject: string,
  html: string,
}

export function send({ email, subject, html }: sendParams) {
  return transporter.sendMail({
    from: 'Auth API',
    to: email,
    subject,
    text: '',
    html,
  });
}

export function sendActivationLink(email: string, token: string) {
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

export const emailService = { send, sendActivationLink };
