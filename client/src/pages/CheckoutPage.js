import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';

function CheckoutPage({ productDetails = {} }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); 

    const handleCheckout = async (formData) => {
        setIsSubmitting(true);
        const orderData = {
            ...formData,
            productId: productDetails.productId,
            productName: productDetails.name,
            variant: productDetails.selectedVariant,
            quantity: productDetails.quantity,
            subtotal: productDetails.price * productDetails.quantity,
            total: productDetails.price * productDetails.quantity
        };
        try {
            const res = await fetch('/api/orders/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const data = await res.json();
            if (res.ok && data.orderNumber) {
                // Navigate to Thank You page with order number
                navigate(`/thank-you/${data.orderNumber}`, {
                    state: {
                        orderDetails: data.orderDetails,
                        transactionStatus: data.transactionStatus
                    }
                });
            } else {
                // handle error (show message, etc.)
            }
        } catch (err) {
            // handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center checkout-bg">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="p-4 rounded shadow checkout-card">
                        <h1 className="text-center mb-4" style={{ color: "#4f46e5", fontWeight: 700, letterSpacing: 1 }}>Checkout</h1>
                        <OrderSummary
                            productName={productDetails.name}
                            variant={productDetails.selectedVariant}
                            quantity={productDetails.quantity}
                            subtotal={productDetails.price * productDetails.quantity}
                            total={productDetails.price * productDetails.quantity}
                        />
                        <CheckoutForm onSubmit={handleCheckout} isSubmitting={isSubmitting} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;