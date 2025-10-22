const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create MySQL connection pool
const pool = mysql.createPool(config);

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL database on port 3308');
    connection.release();
  }
});

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products WHERE in_stock = 1 ORDER BY category, name';
  
  pool.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.json(results);
    }
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ? AND in_stock = 1';
  
  pool.execute(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ error: 'Failed to fetch product' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create new order
app.post('/api/orders', (req, res) => {
  const { customer_name, customer_email, customer_phone, items, notes } = req.body;
  
  if (!customer_name || !customer_email || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Calculate total
  let subtotal = 0;
  items.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  const tax = subtotal * 0.085; // 8.5% tax
  const total = subtotal + tax;

  const orderQuery = `
    INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount, tax_amount, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.execute(orderQuery, [customer_name, customer_email, customer_phone, total, tax, notes], (err, result) => {
    if (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    } else {
      const orderId = result.insertId;
      
      // Insert order items
      const itemQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      let itemsProcessed = 0;
      items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        pool.execute(itemQuery, [orderId, item.id, item.quantity, item.price, itemTotal], (err) => {
          if (err) {
            console.error('Error inserting order item:', err);
          }
          itemsProcessed++;
          
          if (itemsProcessed === items.length) {
            res.json({ 
              success: true, 
              orderId: orderId,
              message: 'Order created successfully' 
            });
          }
        });
      });
    }
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  const query = `
    SELECT o.*, 
           GROUP_CONCAT(
             CONCAT(oi.quantity, 'x ', p.name, ' ($', oi.unit_price, ')') 
             SEPARATOR ', '
           ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    GROUP BY o.id
    ORDER BY o.order_date DESC
  `;
  
  pool.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
    } else {
      res.json(results);
    }
  });
});

// Get order by ID with items
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  
  const orderQuery = 'SELECT * FROM orders WHERE id = ?';
  const itemsQuery = `
    SELECT oi.*, p.name, p.description, p.image_url
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `;
  
  pool.execute(orderQuery, [id], (err, orderResult) => {
    if (err) {
      console.error('Error fetching order:', err);
      res.status(500).json({ error: 'Failed to fetch order' });
    } else if (orderResult.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      pool.execute(itemsQuery, [id], (err, itemsResult) => {
        if (err) {
          console.error('Error fetching order items:', err);
          res.status(500).json({ error: 'Failed to fetch order items' });
        } else {
          res.json({
            order: orderResult[0],
            items: itemsResult
          });
        }
      });
    }
  });
});

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  
  pool.execute(query, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating order status:', err);
      res.status(500).json({ error: 'Failed to update order status' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ success: true, message: 'Order status updated' });
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BrewAndBean API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
