const pool = require('../config/db');

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.id;

  try {
    const existingItem = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1 AND product_id = $2',
      [userId, product_id]
    );

    if (existingItem.rows.length > 0) {
      const updatedItem = await pool.query(
        'UPDATE carts SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, userId, product_id]
      );
      return res.status(200).json(updatedItem.rows[0]);
    } else {
      const newItem = await pool.query(
        'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [userId, product_id, quantity]
      );
      return res.status(201).json(newItem.rows[0]);
    }
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ error: 'Failed to add to cart', details: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await pool.query(
      'SELECT c.*, p.name FROM carts c JOIN products p ON c.product_id = p.id WHERE c.user_id = $1',
      [userId]
    );
    res.json(cartItems.rows);
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ error: 'Failed to fetch cart items', details: error.message });
  }
};
exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params; // Assuming item ID is passed in the URL
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM carts WHERE id = $1 AND user_id = $2 RETURNING *',
      [itemId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart', details: error.message });
  }
};