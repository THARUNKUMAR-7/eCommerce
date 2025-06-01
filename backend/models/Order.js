const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true }, // [cite: 3]
    fullName: { type: String, required: true }, // [cite: 3]
    email: { type: String, required: true }, // [cite: 3]
    phone: { type: String, required: true }, // [cite: 3]
    address: { type: String, required: true }, // [cite: 3]
    city: { type: String, required: true }, // [cite: 3]
    state: { type: String, required: true }, // [cite: 3]
    zipCode: { type: String, required: true }, // [cite: 3]
    // Card details are generally not stored directly for PCI compliance.
    // For this simulation, you might store the last 4 digits or skip storing them.
    // The prompt says "Store all input data"[cite: 3], so for the test, you might include them,
    // but be aware this is not for production.
    cardNumberLast4: { type: String }, // Example: store only last 4
    expiryDate: { type: String }, // [cite: 3]
    // CVV is never stored.

    // Order details
    productName: { type: String, required: true },
    variant: { type: String }, // e.g., selected size [cite: 4]
    quantity: { type: Number, required: true }, // [cite: 4]
    subtotal: { type: Number, required: true }, // [cite: 4]
    total: { type: Number, required: true }, // [cite: 4]

    transactionStatus: { type: String, enum: ['Approved', 'Declined', 'Gateway Error'], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);