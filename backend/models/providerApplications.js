// models/application.js
const db = require('../config/db');

const Application = {
    // Create a new application
    create: (userId, scholarshipId, callback) => {
        const sql = 'INSERT INTO applications (user_id, scholarship_id, status) VALUES (?, ?, "applied")';
        db.query(sql, [userId, scholarshipId], callback);
    },

    // Get all applications for a scholarship
    getByScholarshipId: (scholarshipId, callback) => {
        const sql = 'SELECT * FROM applications WHERE scholarship_id = ?';
        db.query(sql, [scholarshipId], callback);
    },

    // Get all applications by a user
    getByUserId: (userId, callback) => {
        const sql = 'SELECT * FROM applications WHERE user_id = ?';
        db.query(sql, [userId], callback);
    },
};

module.exports = Application;
