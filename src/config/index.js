// Eviromental variables
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT,
} = process.env;

const config = {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
};

export default config;
