const { Pool } = require("pg");
const logger = require("./logger");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    logger.error("Database connection error: %s", err.stack);
  } else {
    logger.info("Database connected successfully at %s", res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
