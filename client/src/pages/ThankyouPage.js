import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../services/api';
import OrderSummary from '../components/OrderSummary'

function ThankyouPage() {
    const { orderNumber } = useParams();
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails);
    const [transactionStatus, setTransactionStatus] = useState(location.state?.transactionStatus);
    const [loading, setLoading] = useState(!location.state?.orderDetails);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderDetails && orderNumber) {
            const fetchOrder = async () => {
                try {
                    const response = await api.getOrderDetails(orderNumber);
                    setOrderDetails(response.data);
                    setTransactionStatus(response.data.transactionStatus);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch order details.');
                    setLoading(false);
                }
            };
            fetchOrder();
        } else if (orderDetails) {
            setLoading(false);
        }
    }, [orderNumber, orderDetails]);

    if (loading) return <div className="thankyou-bg min-vh-100 d-flex align-items-center justify-content-center"><p>Loading order confirmation...</p></div>;
    if (error) return <div className="thankyou-bg min-vh-100 d-flex align-items-center justify-content-center"><p style={{ color: 'red' }}>{error}</p></div>;
    if (!orderDetails) return <div className="thankyou-bg min-vh-100 d-flex align-items-center justify-content-center"><p>Order not found.</p></div>;

    const isApproved = transactionStatus === 'Approved';

    return (
        <div className="container-fluid thankyou-bg min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="p-4 rounded shadow thankyou-card">
                        <h1 className="text-center mb-3" style={{ color: isApproved ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                            {isApproved ? 'Thank You for Your Order!' : 'Order Status'}
                        </h1>
                        <p className="text-center mb-4" style={{ color: "#4f46e5" }}>
                            <strong>Unique Order Number:</strong> {orderDetails.orderNumber}
                        </p>
                        <div className="mb-4">
                            {isApproved && (
                                <div className="alert alert-success text-center" role="alert">
                                    <strong>Final Confirmation:</strong> Your order has been successfully placed and a confirmation email has been sent.
                                </div>
                            )}
                            {!isApproved && (
                                <div className="alert alert-danger text-center" role="alert">
                                    <strong>Final Confirmation:</strong> Your transaction was {transactionStatus.toLowerCase()}. Please check your email for details or contact support.
                                </div>
                            )}
                        </div>
                        <h2 className="mb-3" style={{ color: "#6366f1" }}>Full Order Summary</h2>
                        <OrderSummary
                            productName={orderDetails.productName}
                            variant={orderDetails.variant}
                            quantity={orderDetails.quantity}
                            subtotal={orderDetails.subtotal}
                            total={orderDetails.total}
                        />
                        <h2 className="mt-4 mb-3" style={{ color: "#6366f1" }}>Customer Input Data</h2>
                        <div className="mb-2"><strong>Full Name:</strong> {orderDetails.fullName}</div>
                        <div className="mb-2"><strong>Email:</strong> {orderDetails.email}</div>
                        <div className="mb-2"><strong>Phone:</strong> {orderDetails.phone}</div>
                        <div className="mb-2"><strong>Address:</strong> {orderDetails.address}, {orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}</div>
                        {orderDetails.cardNumberLast4 && (
                            <div className="mb-2"><strong>Card (Last 4 digits):</strong> **** **** **** {orderDetails.cardNumberLast4}</div>
                        )}
                        <div className="mb-2"><strong>Transaction Status:</strong> {orderDetails.transactionStatus}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThankyouPage;