const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Database configuration
const config = {
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: ''
};

// Create connection
const connection = mysql.createConnection(config);

console.log('Setting up BrewAndBean database...');

// Read and execute schema
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Split schema into individual statements
const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);

let currentStatement = 0;

function executeNextStatement() {
  if (currentStatement >= statements.length) {
    console.log('✅ Database setup completed successfully!');
    console.log('📊 Database: brewandbean');
    console.log('📋 Tables: products, orders, order_items');
    console.log('☕ Sample products: 12 coffee items');
    connection.end();
    return;
  }

  const statement = statements[currentStatement].trim();
  if (statement) {
    connection.execute(statement, (err, results) => {
      if (err) {
        console.error(`❌ Error executing statement ${currentStatement + 1}:`, err.message);
        connection.end();
        return;
      }
      
      console.log(`✅ Statement ${currentStatement + 1} executed successfully`);
      currentStatement++;
      executeNextStatement();
    });
  } else {
    currentStatement++;
    executeNextStatement();
  }
}

// Start execution
executeNextStatement();
