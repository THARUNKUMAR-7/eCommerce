import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import ThankyouPage from './pages/ThankyouPage';
import LandingPage from './pages/LandingPage';
// Optional: AppContext for managing product selection state
// import { AppProvider } from './context/AppContext';

function App() {
    // State to pass selected product details from Landing to Checkout
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        // <AppProvider> // If using Context
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage setSelectedProduct={setSelectedProduct} />} />
                <Route
                    path="/checkout"
                    element={selectedProduct ? <CheckoutPage productDetails={selectedProduct} /> : <Navigate to="/" />}
                />
                <Route path="/thank-you/:orderNumber" element={<ThankyouPage />} />
            </Routes>
        </Router>
        // </AppProvider>
    );
}

export default App;