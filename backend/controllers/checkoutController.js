const generateOrderNumber = require('../utils/generateOrderNumber');

exports.handleCheckout = (req, res) => {
    const {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        cardNumber,
        expiryDate,
        cvv,
        productName,
        variant,
        quantity,
        subtotal,
        total
    } = req.body;

    // Simple validation
    if (!fullName || !email || !productName || !quantity || !cardNumber) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Simulate order saving and payment processing
    const orderNumber = generateOrderNumber();

    const orderDetails = {
        customer: { fullName, email, phone, address, city, state, zipCode },
        product: { productName, variant, quantity, subtotal, total },
        payment: { last4: cardNumber.slice(-4), expiryDate },
        createdAt: new Date()
    };

    const transactionStatus = 'success';

    return res.status(200).json({
        orderNumber,
        orderDetails,
        transactionStatus
    });
};
