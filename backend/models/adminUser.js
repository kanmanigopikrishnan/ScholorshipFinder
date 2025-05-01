const mysql = require('mysql2');
const db = require('../config/db'); // Database connection file

const User = {
  getAll: async () => {
    try {
      const [rows] = await db.execute('SELECT * FROM users');
      return rows;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0]; // Return the first user (assuming ID is unique)
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await db.execute('DELETE FROM users WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = User;
