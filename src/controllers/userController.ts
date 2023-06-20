import userService from '../services/userService';
import express from 'express';

async function getAllActive(req: express.Request, res: express.Response) {
  const users = await userService.getAllActive();

  res.send(
    users.map(userService.normalize),
  );
}

export default {
  getAllActive,
};
