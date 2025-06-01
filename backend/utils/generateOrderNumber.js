// Generates a unique order number in the format ORD-XXXXXX (6 digits)
function generateOrderNumber() {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
}

module.exports = generateOrderNumber;