import express from 'express';
import phoneController from '../controllers/phoneController';

const phoneRouter = express.Router();

phoneRouter.get('/', phoneController.getAllPhones);

phoneRouter.get('/:id', phoneController.getPhoneById);

export default {
  phoneRouter,
};
