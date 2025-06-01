require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');

const checkoutRoutes = require('./routes/checkoutRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/ProductRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
             useNewUrlParser: true,
                useUnifiedTopology: true,
        });
        console.log('MongoDB Connected successfully! 🍃');
    } catch (err) {
        console.error('MongoDB Connection Error ❌:', err.message);
        process.exit(1);
    }
};

connectDB();

//Product initialization
Product.initializeProducts();

// --- Routes ---
app.get('/', (req, res) => {
    res.send('eCommerce Checkout Flow API is running! 🚀');
});
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/orders', checkoutRoutes);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).send({ error: 'Something went wrong!', details: err.message });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🎧`);
});
