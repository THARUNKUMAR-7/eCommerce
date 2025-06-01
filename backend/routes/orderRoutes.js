const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /api/orders/checkout - Process checkout
router.post('/checkout', orderController.createOrder);

// GET /api/orders/:orderNumber - Fetch order details for Thank You page [cite: 5]
router.get('/:orderNumber', orderController.getOrderDetails);

module.exports = router;