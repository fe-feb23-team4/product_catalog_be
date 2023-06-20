import phoneService from '../services/phoneService';
import express from 'express';

async function getAllPhones(req: express.Request, res: express.Response) {
  const phones = await phoneService.getAllPhones();

  res.status(200);
  res.send(phones);
}

async function getPhoneById(req: express.Request, res: express.Response) {
  const { id } = req.params;

  const foundPhone = await phoneService.getPhoneById(id);

  if (!foundPhone) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundPhone);
}

export default {
  getAllPhones,
  getPhoneById,
};
