# BrewAndBean Setup Instructions

## Prerequisites
- XAMPP installed and running
- Node.js installed
- MySQL running on port 3308

## Database Setup

1. **Start XAMPP**
   - Start Apache and MySQL services
   - Ensure MySQL is running on port 3308

2. **Create Database**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Import the database schema:
   ```sql
   -- Run the contents of database/schema.sql
   ```

3. **Verify Database**
   - Database name: `brewandbean`
   - Tables: `products`, `orders`, `order_items`
   - Should have 12 sample products inserted

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   - Server will run on http://localhost:5000
   - API endpoints available at http://localhost:5000/api

## Frontend Setup

1. **Navigate to project root**
   ```bash
   cd ..
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```
   - Frontend will run on http://localhost:3000

## Testing the Complete System

1. **Access the website**: http://localhost:3000
2. **Browse products**: Go to Menu page
3. **Add items to cart**: Click "Add to Order" on any product
4. **View cart**: Click cart icon in header
5. **Place order**: Click "Proceed to Checkout", fill form, and submit
6. **View orders**: Go to Orders page to see all placed orders

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order with items
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/health` - Health check

## Database Schema

### Products Table
- id (Primary Key)
- name
- description
- price
- category
- image_url
- in_stock
- created_at
- updated_at

### Orders Table
- id (Primary Key)
- customer_name
- customer_email
- customer_phone
- total_amount
- tax_amount
- status
- order_date
- notes

### Order Items Table
- id (Primary Key)
- order_id (Foreign Key)
- product_id (Foreign Key)
- quantity
- unit_price
- total_price

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running on port 3308
- Check database credentials in `backend/config.js`
- Verify database `brewandbean` exists

### API Connection Issues
- Ensure backend server is running on port 5000
- Check CORS settings in backend
- Verify API endpoints are accessible

### Frontend Issues
- Ensure all dependencies are installed
- Check browser console for errors
- Verify API calls are reaching the backend

## Features Implemented

✅ **Complete Order System**
- Product catalog with database integration
- Shopping cart with add/remove functionality
- Checkout process with customer information
- Order management system
- Real-time order status updates

✅ **Database Integration**
- MySQL database with proper schema
- RESTful API with Express.js
- CRUD operations for products and orders
- Data validation and error handling

✅ **Modern UI/UX**
- Responsive design with Bootstrap
- Coffee-themed styling
- Interactive components
- Loading states and error handling
- Success notifications

The system is now ready for production use with full order management capabilities!
