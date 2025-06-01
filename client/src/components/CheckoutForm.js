import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckoutForm.css';

function CheckoutForm({ onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '',
        cardNumber: '', expiryDate: '', cvv: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required.';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!formData.state) newErrors.state = 'State is required.';
        if (!formData.zipCode || !/^\d{5,6}$/.test(formData.zipCode)) newErrors.zipCode = 'Valid ZIP code is required.';
        if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Valid 16-digit card number is required.';
        if (!formData.expiryDate) {
            newErrors.expiryDate = 'Expiry date is required.';
        } else {
            const [month, year] = formData.expiryDate.split('/');
            const expiry = new Date(`20${year}`, month - 1);
            const now = new Date();
            now.setHours(0,0,0,0);
            if (expiry <= now) newErrors.expiryDate = 'Expiry date must be in the future.';
        }
        if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'Valid 3-digit CVV is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="checkout-form-container">
            <h2>Secure Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name:</label>
                    <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
                    {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number:</label>
                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                    {errors.address && <div className="text-danger">{errors.address}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">City:</label>
                    <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} />
                    {errors.city && <div className="text-danger">{errors.city}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">State:</label>
                    <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} />
                    {errors.state && <div className="text-danger">{errors.state}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Zip Code:</label>
                    <input type="text" name="zipCode" className="form-control" value={formData.zipCode} onChange={handleChange} />
                    {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Card Number (16 digits, last digit 1=Approved, 2=Declined, 3=Gateway Error):</label>
                    <input type="text" name="cardNumber" className="form-control" value={formData.cardNumber} onChange={handleChange} maxLength="16" />
                    {errors.cardNumber && <div className="text-danger">{errors.cardNumber}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Expiry Date (MM/YY):</label>
                    <input type="text" name="expiryDate" className="form-control" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" />
                    {errors.expiryDate && <div className="text-danger">{errors.expiryDate}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">CVV (3 digits):</label>
                    <input type="text" name="cvv" className="form-control" value={formData.cvv} onChange={handleChange} maxLength="3" />
                    {errors.cvv && <div className="text-danger">{errors.cvv}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Submit Order'}
                </button>
            </form>
        </div>
    );
}

export default CheckoutForm;