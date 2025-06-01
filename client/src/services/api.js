import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // Assuming backend is served on the same domain or proxied
});

// Assign the object to a named variable
const apiService = {
    submitCheckout(payload) {
        return apiClient.post('/orders/checkout', payload);
    },
     submitOrder(payload) {
        return apiClient.post('/orders', payload);
    },
    getOrderDetails(orderNumber) {
        return apiClient.get(`/orders/${orderNumber}`);
    }
    // Example if you had getProductDetails
    // getProductDetails(productId) {
    //     return apiClient.get(`/products/${productId}`);
    // }
};

// Export the named variable as the default
export default apiService;