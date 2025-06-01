const Order = require('../models/Order');
const Product = require('../models/Product');
const generateOrderNumber = require('../utils/generateOrderNumber');
const { sendEmail } = require('../config/mailer');

// Helper to ensure unique order number
async function getUniqueOrderNumber() {
    let orderNumber, exists;
    do {
        orderNumber = generateOrderNumber();
        exists = await Order.exists({ orderNumber });
    } while (exists);
    return orderNumber;
}

exports.createOrder = async (req, res) => {
    const {
        fullName, email, phone, address, city, state, zipCode,
        cardNumber, expiryDate, cvv,
        productName, productId, variant, quantity, subtotal, total
    } = req.body;

    let transactionStatus;
    let inventoryUpdated = false;

    const lastCardDigit = cardNumber.slice(-1);

    if (lastCardDigit === '1') {
        transactionStatus = 'Approved';
    } else if (lastCardDigit === '2') {
        transactionStatus = 'Declined';
    } else if (lastCardDigit === '3') {
        transactionStatus = 'Gateway Error';
    } else {
        transactionStatus = 'Approved';
    }

    // Use the unique order number generator here:
    const orderNumber = await getUniqueOrderNumber();

    try {
        if (transactionStatus === 'Approved') {
            const product = await Product.findOne({ productId: productId });
            if (!product || product.inventoryCount < quantity) {
                return res.status(400).json({ message: 'Product out of stock or insufficient quantity.' });
            }
            product.inventoryCount -= quantity;
            await product.save();
            inventoryUpdated = true;
        }

        const newOrder = new Order({
            orderNumber, fullName, email, phone, address, city, state, zipCode,
            cardNumberLast4: cardNumber.slice(-4),
            expiryDate,
            productName, variant, quantity, subtotal, total,
            transactionStatus
        });
        await newOrder.save();

        const emailData = { orderNumber, productName, variant, quantity, total, fullName, email, phone, address, city, state, zipCode, transactionStatus };
        if (transactionStatus === 'Approved') {
            await sendEmail(email, 'Order Confirmation', 'approvedTransactionEmail.html', emailData);
        } else {
            await sendEmail(email, 'Order Transaction Failed', 'declinedTransactionEmail.html', emailData);
        }

        res.status(201).json({
            message: `Transaction ${transactionStatus}. Order ${transactionStatus === 'Approved' ? 'placed' : 'not placed'}.`,
            orderNumber,
            transactionStatus,
            orderDetails: newOrder
        });

    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: 'Server error during checkout.' });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching order details.' });
    }
};