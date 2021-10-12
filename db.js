// eslint-disable-next-line import/extensions
import './config.js';

import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_NAME,
});

export default pool;
