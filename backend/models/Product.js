const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String }, // Added description field
    price: { type: Number, required: true },
    variants: {
        size: [{ type: String }]
    },
    inventoryCount: { type: Number, required: true },
    imageUrl: { type: String }
});

// Static method to initialize 10 products
productSchema.statics.initializeProducts = async function () {
    const products = [
        {
            productId: 'CONVERSE-CHUCK-TAYLOR-II-HI',
            name: 'Converse Chuck Taylor ',
            description: 'Classic canvas high-top sneaker with modern comfort for everyday wear.',
            price: 75.00,
            variants: { size: ['S', 'M', 'L', 'XL'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.jUUc7%2b50S%2faPKQ474C474&o=5&pid=21.1&w=177&h=177&rs=1&qlt=100&dpr=0.8'
        },
        {
            productId: 'NIKE-AIR-MAX-90',
            name: 'Nike Air Max 90',
            description: 'Iconic running shoe with visible Air cushioning and bold style.',
            price: 120.00,
            variants: { size: ['7', '8', '9', '10', '11'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.FtezFPlRQbIc%2bw474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
        },
        {
            productId: 'ADIDAS-ULTRABOOST',
            name: 'Adidas Ultraboost',
            description: 'Responsive running shoe with Boost cushioning for superior energy return.',
            price: 140.00,
            variants: { size: ['6', '7', '8', '9', '10'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.%2ftRAvrFM%2bDmXsQ474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
        },
        {
            productId: 'PUMA-RS-X',
            name: 'Puma RS-X',
            description: 'Chunky retro-inspired sneaker with bold colors and comfortable fit.',
            price: 110.00,
            variants: { size: ['6', '7', '8', '9', '10'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.wyx%2fOojvU%2bKo9g474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
        },
        {
            productId: 'VANS-OLD-SKOOL',
            name: 'Vans Old Skool',
            description: 'Timeless skate shoe with signature side stripe and durable canvas.',
            price: 65.00,
            variants: { size: ['S', 'M', 'L', 'XL'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.ZGaqiHdC%2fM4f9g474C474&o=5&pid=21.1&h=124&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF&w=167'
        },
        {
            productId: 'REEBOK-CLASSIC',
            name: 'Reebok Classic',
            description: 'Retro leather sneaker offering comfort, versatility, and everyday style.',
            price: 80.00,
            variants: { size: ['7', '8', '9', '10', '11'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.Gh8451LP53gqug474C474&o=5&pid=21.1&w=160&h=235&rs=1&qlt=100&dpr=0.8&pcl=f5f5f5'
        },
        {
            productId: 'NEW-BALANCE-574',
            name: 'New Balance 574',
            description: 'Classic running shoe with suede and mesh for all-day comfort.',
            price: 90.00,
            variants: { size: ['6', '7', '8', '9', '10'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.3LVcbO3jmT9AiA474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
        },
        {
            productId: 'FILA-DISRUPTOR',
            name: 'Fila Disruptor',
            description: 'Chunky silhouette sneaker with bold design and comfortable cushioning.',
            price: 70.00,
            variants: { size: ['S', 'M', 'L', 'XL'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.5Zl%2bNPcBsa7L8g474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
        },
        {
            productId: 'ASICS-GEL-LYTE',
            name: 'ASICS Gel-Lyte',
            description: 'Lightweight running shoe with GEL cushioning for superior comfort.',
            price: 95.00,
            variants: { size: ['7', '8', '9', '10', '11'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.FtezFPlRQbIc%2bw474C474&o=5&pid=21.1&w=177&h=177&rs=1&qlt=100&dpr=0.8'
        },
        {
            productId: 'SAUCONY-JAZZ-ORIGINAL',
            name: 'Saucony Jazz Original',
            description: 'Vintage-inspired sneaker with suede overlays and shock-absorbing midsole.',
            price: 85.00,
            variants: { size: ['6', '7', '8', '9', '10'] },
            inventoryCount: 100,
            imageUrl: 'https://www.bing.com/th?id=OPAC.zz5lygWUHAXBIg474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
        }
    ];

    for (const prod of products) {
        // Upsert: insert if not exists, update if exists
        await this.updateOne(
            { productId: prod.productId },
            { $setOnInsert: prod },
            { upsert: true }
        );
    }
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;