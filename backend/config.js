// Database configuration for XAMPP MySQL
module.exports = {
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '', // Default XAMPP password (empty)
  database: 'brewandbean',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
