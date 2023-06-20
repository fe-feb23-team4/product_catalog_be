import { Phone } from '../models/Phone';

async function getAllPhones() {
  const allPhones = await Phone.findAll();

  return allPhones;
}

async function getPhoneById(phoneId: string) {
  const foundPhone = await Phone.findByPk(phoneId);

  return foundPhone;
}

export default {
  getAllPhones,
  getPhoneById,
};
