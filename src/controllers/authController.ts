import express from 'express';
import userService from '../services/userService';
import jwtService from '../services/jwtService';
import { ApiError } from '../exceptions/ApiError';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

function validationEmail(email: string) {
  if (!email) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(email)) {
    return 'Email is not valid';
  }
}

function validationPassword(password: string) {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password should contain at least 6 characters';
  }
}

async function register(req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  const errors = {
    email: validationEmail(email),
    password: validationPassword(password),
  };

  if (errors.email || errors.password) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  await userService.register({ email, password });

  res.status(201);

  res.send({
    message: 'ok',
  });
}

async function login(req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('User with such an email does not exist', {
      error: 'User with such an email does not exist',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw ApiError.BadRequest('Password is now valid');
  }

  if (password !== user.password) {
    throw ApiError.Unauthorized();
  }

  sendAuthentication(res, user);
}

function sendAuthentication(res: express.Response, user: User) {
  const userData = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);
  const refreshToken = jwtService.generateRefreshToken(userData);

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

async function refresh(req: express.Request, res: express.Response) {
  const { refreshToken } = req.cookies;

  const userData = jwtService.validateRefreshToken(refreshToken);

  if (!userData || typeof userData !== 'object' || !userData.email) {
    throw ApiError.Unauthorized();
  }

  const user = await userService.getUserByEmail(userData.email);

  if (!user) {
    throw ApiError.BadRequest('User is not found');
  }

  sendAuthentication(res, user);
}

async function activate(req: express.Request, res: express.Response) {
  const { activationToken } = req.params;

  const user = await userService.findUserByActivationToken(activationToken);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user.activationToken = '';
  await user.save();
  res.send(user);
}

export default {
  register,
  login,
  refresh,
  activate,
};
