import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock 10 products
const mockProducts = [
    {
        id: 1,
        productId: 'CONVERSE-CHUCK-TAYLOR-II-HI',
        name: 'Converse Chuck Taylor ',
        description: 'Classic canvas high-top sneaker with modern comfort for everyday wear.',
        price: 75.00,
        variants: { size: ['S', 'M', 'L', 'XL'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.jUUc7%2b50S%2faPKQ474C474&o=5&pid=21.1&w=177&h=177&rs=1&qlt=100&dpr=0.8'
    },
    {
        id: 2,
        productId: 'NIKE-AIR-MAX-90',
        name: 'Nike Air Max 90',
        description: 'Iconic running shoe with visible Air cushioning and bold style.',
        price: 120.00,
        variants: { size: ['7', '8', '9', '10', '11'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.FtezFPlRQbIc%2bw474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
    },
    {
        id: 3,
        productId: 'ADIDAS-ULTRABOOST',
        name: 'Adidas Ultraboost',
        description: 'Responsive running shoe with Boost cushioning for superior energy return.',
        price: 140.00,
        variants: { size: ['6', '7', '8', '9', '10'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.%2ftRAvrFM%2bDmXsQ474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
    },
    {
        id: 4,
        productId: 'PUMA-RS-X',
        name: 'Puma RS-X',
        description: 'Chunky retro-inspired sneaker with bold colors and comfortable fit.',
        price: 110.00,
        variants: { size: ['6', '7', '8', '9', '10'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.wyx%2fOojvU%2bKo9g474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
    },
    {
        id: 5,
        productId: 'VANS-OLD-SKOOL',
        name: 'Vans Old Skool',
        description: 'Timeless skate shoe with signature side stripe and durable canvas.',
        price: 65.00,
        variants: { size: ['S', 'M', 'L', 'XL'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.ZGaqiHdC%2fM4f9g474C474&o=5&pid=21.1&h=124&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF&w=167'
    },
    {
        id: 6,
        productId: 'REEBOK-CLASSIC',
        name: 'Reebok Classic',
        description: 'Retro leather sneaker offering comfort, versatility, and everyday style.',
        price: 80.00,
        variants: { size: ['7', '8', '9', '10', '11'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.Gh8451LP53gqug474C474&o=5&pid=21.1&w=160&h=235&rs=1&qlt=100&dpr=0.8&pcl=f5f5f5'
    },
    {
        id: 7,
        productId: 'NEW-BALANCE-574',
        name: 'New Balance 574',
        description: 'Classic running shoe with suede and mesh for all-day comfort.',
        price: 90.00,
        variants: { size: ['6', '7', '8', '9', '10'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.3LVcbO3jmT9AiA474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
    },
    {
        id: 8,
        productId: 'FILA-DISRUPTOR',
        name: 'Fila Disruptor',
        description: 'Chunky silhouette sneaker with bold design and comfortable cushioning.',
        price: 70.00,
        variants: { size: ['S', 'M', 'L', 'XL'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.5Zl%2bNPcBsa7L8g474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
    },
    {
        id: 9,
        productId: 'ASICS-GEL-LYTE',
        name: 'ASICS Gel-Lyte',
        description: 'Lightweight running shoe with GEL cushioning for superior comfort.',
        price: 95.00,
        variants: { size: ['7', '8', '9', '10', '11'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.FtezFPlRQbIc%2bw474C474&o=5&pid=21.1&w=177&h=177&rs=1&qlt=100&dpr=0.8'
    },
    {
        id: 10,
        productId: 'SAUCONY-JAZZ-ORIGINAL',
        name: 'Saucony Jazz Original',
        description: 'Vintage-inspired sneaker with suede overlays and shock-absorbing midsole.',
        price: 85.00,
        variants: { size: ['6', '7', '8', '9', '10'] },
        imageUrl: 'https://www.bing.com/th?id=OPAC.zz5lygWUHAXBIg474C474&o=5&pid=21.1&w=148&h=148&rs=1&qlt=100&dpr=0.8&bw=6&bc=FFFFFF'
    }
];

function LandingPage({ setSelectedProduct }) {
    const navigate = useNavigate();
    const [products] = useState(mockProducts);
    const [selectedVariants, setSelectedVariants] = useState(
        products.reduce((acc, p) => ({ ...acc, [p.id]: p.variants.size[0] }), {})
    );
    const [quantities, setQuantities] = useState(
        products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
    );

    const handleVariantChange = (id, value) => {
        setSelectedVariants({ ...selectedVariants, [id]: value });
    };

    const handleQuantityChange = (id, value) => {
        setQuantities({ ...quantities, [id]: value });
    };

    const handleBuyNow = (product) => {
        setSelectedProduct({
            ...product,
            selectedVariant: selectedVariants[product.id],
            quantity: quantities[product.id]
        });
        navigate('/checkout');
    };

    return (
        <div
            className="min-vh-100 py-5"
            style={{
                background: "linear-gradient(135deg, #e0e7ff 0%, #86a2be 100%)"
            }}
        >
            <div className="container">
                <div className="row">
                    {products.map(product => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                            <div className="card h-100 d-flex flex-column shadow-sm">
                                <img src={product.imageUrl} alt={product.name} className="card-img-top img-fluid" style={{ height: "180px", objectFit: "cover" }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary fw-bold">{product.name}</h5>
                                    <p className="card-text" style={{ minHeight: 48 }}>{product.description}</p>
                                    <p className="card-text"><span className="fw-semibold">Price:</span> ${product.price.toFixed(2)}</p>
                                    <div className="mb-2">
                                        <label htmlFor={`variant-${product.id}`} className="form-label">Variant (Size):</label>
                                        <select
                                            id={`variant-${product.id}`}
                                            className="form-select"
                                            value={selectedVariants[product.id]}
                                            onChange={e => handleVariantChange(product.id, e.target.value)}
                                        >
                                            {product.variants.size.map(v => (
                                                <option key={v} value={v}>{v}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor={`quantity-${product.id}`} className="form-label">Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${product.id}`}
                                            className="form-control"
                                            value={quantities[product.id]}
                                            min="1"
                                            onChange={e => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;