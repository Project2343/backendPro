const pool = require('../config/db');

const createProductTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      discount DECIMAL(5, 2) DEFAULT 0,
      seller_id INTEGER REFERENCES users(id)
    )
  `);
};

module.exports = { createProductTable };
