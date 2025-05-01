const mysql = require('mysql2');
const db = require('../config/db');

const Scholarship = {
  getAll: async () => {
    try {
      const [rows] = await db.execute('SELECT * FROM scholarships');
      return rows;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM scholarships WHERE id = ?', [id]);
      return rows[0]; // Return the scholarship
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await db.execute('DELETE FROM scholarships WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Scholarship;
