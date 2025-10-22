const mysql = require('mysql2');

// Database configuration
const config = {
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '',
  database: 'brewandbean'
};

// Create connection
const connection = mysql.createConnection(config);

console.log('Updating product images...');

// Update specific product images
const updateQueries = [
  {
    name: 'Drip Coffee',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop'
  },
  {
    name: 'French Press',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop'
  },
  {
    name: 'Pour Over',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300&h=300&fit=crop'
  },
  {
    name: 'Mocha',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop'
  }
];

let completed = 0;

updateQueries.forEach((product, index) => {
  const query = 'UPDATE products SET image_url = ? WHERE name = ?';
  
  connection.execute(query, [product.image, product.name], (err, result) => {
    if (err) {
      console.error(`Error updating ${product.name}:`, err);
    } else {
      console.log(`✅ Updated ${product.name} image`);
    }
    
    completed++;
    if (completed === updateQueries.length) {
      console.log('\n🎉 All product images updated successfully!');
      connection.end();
    }
  });
});
