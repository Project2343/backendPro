const pool = require('../config/db');

const createCartTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER DEFAULT 1
    )
  `);
};

module.exports = { createCartTable };
