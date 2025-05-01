const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/user'); // adjust if needed

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email, and make sure it returns id
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Sign JWT with id and email
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Make sure user.id is defined
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Error in login process:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register function
const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword, mobile);

    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// Logout (optional for client use)
const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  login,
  register,
  logout
};