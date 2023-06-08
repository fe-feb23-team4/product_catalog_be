"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbinit = void 0;
/* eslint-disable max-len */
const pg_1 = __importDefault(require("pg"));
const sequelize_typescript_1 = require("sequelize-typescript");
const URI =
  "postgres://alexnovaklawyer:4KnxRozeh1mF@ep-billowing-cake-723225.eu-central-1.aws.neon.tech/neondb";
const dbinit = () =>
  new sequelize_typescript_1.Sequelize(URI, {
    dialectModule: pg_1.default,
    dialectOptions: {
      ssl: true,
    },
  });
exports.dbinit = dbinit;
