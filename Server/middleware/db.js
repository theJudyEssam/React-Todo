// this will be for database connection
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from "dotenv"

dotenv.config()

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'Todo',
    password: process.env.PASSWORD,
    port: 5432,
  });


//module.exports = pool;