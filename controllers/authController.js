const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route  POST /api/auth/register
// @desc   Register new user
// @access Public
const register = async (req, res) => {
  try {
    const { name, email, password, branch, year, interests } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      branch: branch || 'CSE',
      year: year || '1',
      interests: interests || [],
      schedule: [
        { id: 's1', start: 9, end: 10.5, title: 'Morning Class' },
        { id: 's2', start: 15, end: 17, title: 'Lab Session' }
      ]
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        branch: user.branch,
        year: user.year,
        interests: user.interests,
        joinedClubs: user.joinedClubs,
        registeredEvents: user.registeredEvents,
        mentorConnections: user.mentorConnections,
        schedule: user.schedule
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/auth/login
// @desc   Login user
// @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user with password included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found with this email' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        branch: user.branch,
        year: user.year,
        interests: user.interests,
        joinedClubs: user.joinedClubs,
        registeredEvents: user.registeredEvents,
        mentorConnections: user.mentorConnections,
        schedule: user.schedule
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/auth/me
// @desc   Get logged in user
// @access Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe };
