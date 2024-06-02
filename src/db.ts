import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { PoolOptions } from 'mysql2';

dotenv.config() //Import the .env DB files

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

console.log(dbConfig)

const pool = mysql.createPool(dbConfig);

export {pool};