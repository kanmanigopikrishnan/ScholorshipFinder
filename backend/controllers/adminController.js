
const db = require('../config/db'); // Assume you have a database connection configured

// Get statistics (users, scholarships, applications)
const getStats = async (req, res) => {
  try {
    const [totalUsers] = await db.promise().query('SELECT COUNT(*) AS total FROM users');
    const [totalScholarships] = await db.promise().query('SELECT COUNT(*) AS total FROM scholarships');
    const [totalApplications] = await db.promise().query('SELECT COUNT(*) AS total FROM applications');
    
    res.status(200).json({
      totalUsers: totalUsers[0].total,
      totalScholarships: totalScholarships[0].total,
      totalApplications: totalApplications[0].total,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

// Get list of users
const getUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query('SELECT * FROM users');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get list of scholarships
const getScholarships = async (req, res) => {
  try {
    const [scholarships] = await db.promise().query('SELECT * FROM scholarships');
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ message: 'Error fetching scholarships' });
  }
};

// Get list of applications
const getApplications = async (req, res) => {
  try {
    const [applications] = await db.promise().query('SELECT * FROM applications');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Delete a scholarship by ID
const deleteScholarship = async (req, res) => {
  try {
    const scholarshipId = req.params.id;
    await db.promise().query('DELETE FROM scholarships WHERE id = ?', [scholarshipId]);
    res.status(200).json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ message: 'Error deleting scholarship' });
  }
};

// Update application status (approve/reject)
const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body; // Status can be 'Approved' or 'Rejected'
    const [application] = await db.promise().query('SELECT * FROM applications WHERE id = ?', [applicationId]);

    if (application.length > 0) {
      await db.promise().query('UPDATE applications SET status = ? WHERE id = ?', [status, applicationId]);
      res.status(200).json({ message: `Application status updated to ${status}` });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
};

module.exports = {
  getStats,
  getUsers,
  getScholarships,
  getApplications,
  deleteUser,
  deleteScholarship,
  updateApplicationStatus,
};
