const mysql = require('mysql2');
const db = require('../config/db');

const Application = {
  getAll: async () => {
    try {
      const [rows] = await db.execute('SELECT * FROM applications');
      return rows;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.execute('SELECT * FROM applications WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateStatus: async (id, status) => {
    try {
      await db.execute('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Application;
