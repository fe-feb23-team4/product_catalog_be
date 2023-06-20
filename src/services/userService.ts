import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../exceptions/ApiError';
import { emailService } from './emailService';
import bcrypt from 'bcrypt';

interface userParams {
  email: string;
  password: string;
}

async function register({ email, password }: userParams) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Email is already registered');
  }

  const activationToken = uuidv4();
  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, hash, activationToken });

  await emailService.sendActivationLink(email, activationToken);

  return user;
}

async function findUserByActivationToken(activationToken: string) {
  const user = await User.findOne({
    where: { activationToken },
  });

  return user;
}

async function getUserByEmail(email: string) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
}

async function getAllActive() {
  const activeUsers = await User.findAll({
    where: {
      activationToken: null,
    },
  });

  return activeUsers;
}

export interface normalizeParams {
  id?: string;
  email: string;
}

function normalize({ id, email }: normalizeParams) {
  return { id, email };
}

export default {
  register,
  findUserByActivationToken,
  getUserByEmail,
  getAllActive,
  normalize,
};
