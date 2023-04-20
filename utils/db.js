const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  user: process.env.APP_USERNAME,
  host: process.env.APP_HOST,
  database: process.env.APP_DATABASE,
  password: process.env.APP_PASSWORD,
  port: process.env.APP_PORT,
});

module.exports = db;
