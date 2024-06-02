"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config(); //Import the .env DB files
const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
console.log(dbConfig);
const pool = mysql.createPool(dbConfig);
exports.pool = pool;
