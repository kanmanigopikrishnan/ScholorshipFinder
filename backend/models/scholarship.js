// Remove Sequelize and DataTypes, we will be using raw MySQL queries

const pool = require('../config/db'); // Import MySQL pool

// Function to fetch all scholarships from the database
const getAllScholarships = async () => {
  try {
    // Use the pool to run the query
    const [scholarships] = await pool.query('SELECT * FROM scholarships');
    return scholarships;  // Return the list of scholarships
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw new Error('Error fetching scholarships');
  }
};

// Function to fetch a single scholarship by ID
const getScholarshipById = async (id) => {
  try {
    const [scholarship] = await pool.query('SELECT * FROM scholarships WHERE id = ?', [id]);
    return scholarship.length ? scholarship[0] : null; // Return the scholarship if found
  } catch (error) {
    console.error('Error fetching scholarship by ID:', error);
    throw new Error('Error fetching scholarship by ID');
  }
};

module.exports = {
  getAllScholarships,
  getScholarshipById,
};
