const pool = require('../config/db');

exports.addProduct = async (req, res) => {
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.id; // Assume user ID is available from middleware

  try {
    const newProduct = await pool.query(
      'INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category, description, price, discount, sellerId]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Product creation failed', details: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};
