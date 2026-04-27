const Club = require('../models/Club');

// @route  GET /api/clubs
// @desc   Get all clubs
// @access Public
const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find().sort({ members: -1 });
    res.json({ success: true, count: clubs.length, clubs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/clubs/:id
// @desc   Get single club
// @access Public
const getClub = async (req, res) => {
  try {
    const club = await Club.findOne({ id: req.params.id });
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.json({ success: true, club });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getClubs, getClub };
