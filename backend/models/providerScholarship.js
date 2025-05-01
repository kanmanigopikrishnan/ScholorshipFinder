// models/scholarship.js
const db = require('../config/db');

const Scholarship = {
    // Get all scholarships
    getAll: (callback) => {
        const sql = 'SELECT * FROM scholarships';
        db.query(sql, callback);
    },

    // Get a single scholarship by ID
    getById: (scholarshipId, callback) => {
        const sql = 'SELECT * FROM scholarships WHERE id = ?';
        db.query(sql, [scholarshipId], callback);
    },

    // Get scholarships by provider
    getByProviderId: (providerId, callback) => {
        const sql = 'SELECT * FROM scholarships WHERE provider_id = ?';
        db.query(sql, [providerId], callback);
    },
};

module.exports = Scholarship;
