// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProductDetails } = require('../controllers/productController');

// Route to get details of the specific product
// The ':productId' can be the static ID you've defined for your single product
router.get('/:productId', getProductDetails);

module.exports = router;