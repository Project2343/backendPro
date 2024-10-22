// routes/cart.js
const express = require('express');
const { addToCart, getCartItems, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addToCart);
router.get('/', authMiddleware, getCartItems);
router.delete('/:itemId', authMiddleware, removeFromCart); // Add this line for removing items

module.exports = router;
