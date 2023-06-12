/* eslint-disable max-len */
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';
import dotenv from 'dotenv';

dotenv.config();

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE } = process.env;

const URI = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

export const dbinit = () =>
  new Sequelize(URI, {
    models,
    dialectModule: pg,
    dialectOptions: {
      ssl: true,
    },
  });
