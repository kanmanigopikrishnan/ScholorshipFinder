require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const applyRoutes = require('./routes/applyRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require ('./routes/adminRoutes');
const providerRoutes = require('./routes/providerRoutes');
const db =require('./config/db');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // to parse application/json
app.use('/uploads' ,
express.static('uploads'));

// Test the database connection
db.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL database');
    connection.release(); // Release connection when done
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Exit if database connection fails
  });

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/provider', providerRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
