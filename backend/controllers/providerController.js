const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.registerProvider = async (req, res) => {
    const { name, email, password, organization_name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO providers (name, email, password, organization_name) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword, organization_name], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Registered successfully' });
    });
};

// Login
exports.loginProvider = (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM providers WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).send({ message: 'Invalid credentials' });
        const valid = await bcrypt.compare(password, results[0].password);
        if (!valid) return res.status(401).send({ message: 'Invalid credentials' });
        const token = jwt.sign({ providerId: results[0].id }, 'secret', { expiresIn: '1d' });
        res.send({ token });
    });
};

// Post scholarship
exports.postScholarship = (req, res) => {
    const { title, description, deadline } = req.body;
    const providerId = req.providerId; // from auth middleware
    const sql = `INSERT INTO scholarships (title, description, deadline, provider_id) VALUES (?, ?, ?, ?)`;
    db.query(sql, [title, description, deadline, providerId], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Scholarship posted' });
    });
};

// Get provider's scholarships
exports.getProviderScholarships = (req, res) => {
    const providerId = req.providerId;
    const sql = `SELECT * FROM scholarships WHERE provider_id = ?`;
    db.query(sql, [providerId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
};

// View applicants
exports.getApplicants = (req, res) => {
    const { scholarshipId } = req.params;
    const sql = `
        SELECT a.*, u.name, u.email FROM applications a 
        JOIN users u ON a.user_id = u.id 
        WHERE a.scholarship_id = ?
    `;
    db.query(sql, [scholarshipId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
};
