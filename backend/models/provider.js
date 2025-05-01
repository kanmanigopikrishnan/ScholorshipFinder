// models/provider.js
const db = require('../config/db');

const Provider = {
    // Register a new provider
    register: (name, email, password, organization_name, callback) => {
        const sql = 'INSERT INTO providers (name, email, password, organization_name) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, password, organization_name], callback);
    },

    // Find provider by email (used for login)
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM providers WHERE email = ?';
        db.query(sql, [email], callback);
    },

    // Get all scholarships posted by a provider
    getScholarships: (providerId, callback) => {
        const sql = 'SELECT * FROM scholarships WHERE provider_id = ?';
        db.query(sql, [providerId], callback);
    },

    // Post a new scholarship
    postScholarship: (title, description, amount, deadline, providerId, callback) => {
        const sql = 'INSERT INTO scholarships (title, description, amount, deadline, provider_id) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [title, description, amount, deadline, providerId], callback);
    },
};

module.exports = Provider;
