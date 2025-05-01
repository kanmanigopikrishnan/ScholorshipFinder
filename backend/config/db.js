const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to MySQL using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'scholarship',
});

// Connect to the database and log success or failure
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Stop the server if connection fails
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release the connection back to the pool
});

// Export the pool with the promise-based API for use in other modules
module.exports = pool.promise();  // This allows you to use the promise-based queries
