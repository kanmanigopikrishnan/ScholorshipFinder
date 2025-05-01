const Scholarship = require('../models/scholarship');
const Application = require('../models/application');
const User = require('../models/user');

// Fetch all scholarships
exports.getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scholarships.' });
  }
};

// Fetch all applications for the logged-in user
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;  // From auth middleware
    const applications = await Application.find({ user_id: userId }).populate('scholarship_id');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your applications.' });
  }
};

// Fetch dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;  // From auth middleware
    const scholarshipsCount = await Scholarship.countDocuments();
    const applicationsCount = await Application.countDocuments({ user_id: userId });
    const approvedCount = await Application.countDocuments({ user_id: userId, status: 'Approved' });

    res.status(200).json({
      scholarshipsCount,
      applicationsCount,
      approvedCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data.' });
  }
};