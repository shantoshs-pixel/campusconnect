const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - user must be logged in
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header: "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

module.exports = { protect };
