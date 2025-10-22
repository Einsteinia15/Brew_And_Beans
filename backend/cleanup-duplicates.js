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

console.log('Cleaning up duplicate products...');

// Remove duplicates and keep only the latest entry for each product name
const cleanupQuery = `
  DELETE p1 FROM products p1
  INNER JOIN products p2 
  WHERE p1.id > p2.id 
  AND p1.name = p2.name;
`;

connection.execute(cleanupQuery, (err, result) => {
  if (err) {
    console.error('Error cleaning up duplicates:', err);
  } else {
    console.log(`✅ Removed ${result.affectedRows} duplicate products`);
  }
  
  // Check final count
  connection.execute('SELECT COUNT(*) as count FROM products', (err, results) => {
    if (err) {
      console.error('Error checking count:', err);
    } else {
      console.log(`📊 Total products in database: ${results[0].count}`);
    }
    connection.end();
  });
});
