const Mentor = require('../models/Mentor');

// @route  GET /api/mentors
// @desc   Get all mentors
// @access Public
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().sort({ rating: -1 });
    res.json({ success: true, count: mentors.length, mentors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/mentors/:id
// @desc   Get single mentor
// @access Public
const getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ id: req.params.id });
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
    res.json({ success: true, mentor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMentors, getMentor };
