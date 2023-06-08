/* eslint-disable max-len */
import { Sequelize } from 'sequelize-typescript';

const URI = 'postgres://alexnovaklawyer:4KnxRozeh1mF@ep-billowing-cake-723225.eu-central-1.aws.neon.tech/neondb';

export const dbinit = () =>
  new Sequelize(URI, {
    dialectOptions: {
      ssl: true,
    },
  });
