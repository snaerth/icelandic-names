import { Pool } from 'pg';
import config from '../config';

const {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = config;

// Set connection options for Postgresql
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

/**
 * Postgresql pool query for executing queries
 * 
 * @param {String} text - Query text
 * @param {Array} params - Query values
 * @returns {Object}
 */
export async function dbQuery(text, params) {
  const start = Date.now();

  try {
    const { rows } = await pool.query(text, params);
    await pool.end();
    const duration = Date.now() - start;

    return { query: text, duration, rows };
  } catch (error) {
    return new Error(error);
  }
}