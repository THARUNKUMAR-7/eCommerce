import React from 'react';

function OrderSummary({ productName, variant, quantity, subtotal, total }) { // [cite: 4]
    return (

        <div className="card mb-4">
            <div className="card-body">
                <h3 className="card-title">Order Summary</h3>
                <p><strong>Product:</strong> {productName}</p>
                <p><strong>Variant:</strong> {variant}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
        </div>

    );
}

export default OrderSummary;