const express = require('express');
const router = express.Router();
const { handleCheckout } = require('../controllers/checkoutController');

router.post('/checkout', handleCheckout);

module.exports = router;
