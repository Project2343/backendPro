const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addProduct);
router.get('/', getProducts);

module.exports = router;
