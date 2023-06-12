"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbinit = void 0;
/* eslint-disable max-len */
const pg_1 = __importDefault(require("pg"));
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE } = process.env;
const URI = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;
const dbinit = () => new sequelize_typescript_1.Sequelize(URI, {
    models: models_1.models,
    dialectModule: pg_1.default,
    dialectOptions: {
        ssl: true,
    },
});
exports.dbinit = dbinit;
