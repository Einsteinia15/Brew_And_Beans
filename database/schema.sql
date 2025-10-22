-- BrewAndBean Database Schema
-- Run this in your MySQL database (port 3308)

CREATE DATABASE IF NOT EXISTS brewandbean;
USE brewandbean;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url) VALUES
('Classic Espresso', 'Rich, concentrated coffee with a golden crema', 3.50, 'Espresso', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&h=300&fit=crop'),
('Velvet Cappuccino', 'Equal parts espresso, steamed milk and foam', 4.25, 'Espresso', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop'),
('Caramel Macchiato', 'Espresso with vanilla syrup, steamed milk and caramel drizzle', 5.00, 'Espresso', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop'),
('Americano', 'Espresso with hot water for a smooth, clean taste', 3.75, 'Espresso', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop'),
('Latte', 'Espresso with steamed milk and a light layer of foam', 4.50, 'Espresso', 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300&h=300&fit=crop'),
('Mocha', 'Espresso with chocolate syrup, steamed milk, and whipped cream', 5.25, 'Espresso', 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=300&h=300&fit=crop'),
('Cold Brew', 'Smooth, refreshing coffee brewed cold for 12 hours', 4.00, 'Cold Coffee', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop'),
('Iced Coffee', 'Freshly brewed coffee served over ice', 3.25, 'Cold Coffee', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop'),
('Frappuccino', 'Blended coffee drink with ice, milk, and flavoring', 5.50, 'Cold Coffee', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop'),
('French Press', 'Full-bodied coffee brewed using the French press method', 4.75, 'Brewed Coffee', 'https://images.unsplash.com/photo-1559056199-5c4d4a0b0b0b?w=300&h=300&fit=crop'),
('Pour Over', 'Hand-crafted coffee using the pour-over method', 4.50, 'Brewed Coffee', 'https://images.unsplash.com/photo-1559056199-5c4d4a0b0b0b?w=300&h=300&fit=crop'),
('Drip Coffee', 'Classic drip-brewed coffee, freshly made', 2.75, 'Brewed Coffee', 'https://images.unsplash.com/photo-1559056199-5c4d4a0b0b0b?w=300&h=300&fit=crop');
