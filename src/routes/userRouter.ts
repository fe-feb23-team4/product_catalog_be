import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.get('/', authMiddleware.addMiddleware, userController.getAllActive);

export default {
  userRouter,
};
