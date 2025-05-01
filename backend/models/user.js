const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'scholarship'
});

// Already existing functions...
const db = require('../config/db');

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT id, email, password FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = (name, email, hashedPassword, mobile) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password, mobile) VALUES (?, ?, ?, ?)';
    pool.query(query, [name, email, hashedPassword, mobile], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Add this function:
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById  // make sure to export it!
};