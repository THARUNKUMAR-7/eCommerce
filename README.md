eCommerce React/MongoDB Project
This is a full-stack eCommerce demo application built with React (frontend), Node.js/Express (backend), and MongoDB (database). It supports product browsing, checkout, order confirmation, and email notifications using Mailtrap.io for safe email testing.

Features:
Responsive product landing page with 10 mock products
Product details, variant (size) selection, and quantity input
Checkout form with order summary
Order creation and inventory management in MongoDB
Confirmation and failure emails sent via Mailtrap
Thank You page with order details and transaction status
Bootstrap 5 styling and modern UI
Tech Stack
**Frontend: React, Bootstrap 5
Backend: Node.js, Express
Database: MongoDB (Mongoose)
Email: Nodemailer + Mailtrap.io**
Getting Started
1. Clone the repository
   git clone https://github.com/yourusername/ecommerce-demo.git
   cd ecommerce-demo
2. Install dependencies
Backend
  cd backend
  npm install
Frontend
  cd ../client
  npm install
3. Set up environment variables
Create a .env file in the backend folder:
  MONGO_URI=mongodb://localhost:27017/ecommerce
  PORT=5001
  
  MAILTRAP_HOST=smtp.mailtrap.io
  MAILTRAP_PORT=2525
  MAILTRAP_USER=your_mailtrap_user
  MAILTRAP_PASS=your_mailtrap_pass

Get your Mailtrap credentials from mailtrap.io.

4. Start the servers
Backend
  cd backend
  npm start
Frontend
  cd ../client
  npm start
Usage
  Visit http://localhost:3000 to browse products.
  Select a product, choose size and quantity, and click Buy Now.
  Fill out the checkout form and submit.
  You’ll be redirected to a Thank You page.
  Check your Mailtrap inbox for confirmation or failure emails.
Project Structure
ecommerce-demo/
  backend/
    models/
    controllers/
    routes/
    config/
    templates/
    server.js
  client/
    src/
      pages/
      components/
      App.js
Customization
  To add more products, update the product seeding logic in Product.js.
  To use a real email service, update the Nodemailer config in mailer.js.

