const Product = require('../models/Product'); 
exports.getProductDetails = async (req, res) => {
    try {
        // Use productId from request params or default to a specific product
        const productId = req.params.productId || 'CONVERSE-CHUCK-TAYLOR-II-HI'; 

        const product = await Product.findOne({ productId: productId });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ message: 'Server error while fetching product details.' });
    }
};

