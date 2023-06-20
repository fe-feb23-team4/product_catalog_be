import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { normalizeParams } from '../services/userService';

function generateAccessToken(user: normalizeParams) {
  return jwt.sign(user, String(process.env.JWT_ACCESS_SECRET), {
    expiresIn: '30m',
  });
}

function generateRefreshToken(user: normalizeParams) {
  return jwt.sign(user, String(process.env.JWT_REFRESH_SECRET), {
    expiresIn: '20d',
  });
}

function validateAccessToken(token: string) {
  try {
    return jwt.verify(token, String(process.env.JWT_ACCESS_SECRET));
  } catch {
    return null;
  }
}

function validateRefreshToken(token: string) {
  try {
    return jwt.verify(token, String(process.env.JWT_REFRESH_SECRET));
  } catch {
    return null;
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
};
