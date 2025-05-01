const User = require('../models/user');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // You can customize what fields you want to return
    res.json({
      name: user.name,
      email: user.email,
      contactno: user.mobile,
      totalApplications: user.totalApplications || 0,
      approvedCount: user.approvedCount || 0,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

module.exports = {
  getUserProfile,
};
