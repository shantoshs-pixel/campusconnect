const User = require('../models/User');

// @route  PUT /api/user/profile
// @desc   Update user profile
// @access Private
const updateProfile = async (req, res) => {
  try {
    const { name, branch, year, interests } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name, branch, year, interests },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/user/rsvp/:eventId
// @desc   Toggle RSVP for an event
// @access Private
const toggleRsvp = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const eventId = req.params.eventId;
    const idx = user.registeredEvents.indexOf(eventId);
    if (idx === -1) {
      user.registeredEvents.push(eventId);
    } else {
      user.registeredEvents.splice(idx, 1);
    }
    await user.save();
    res.json({ success: true, registeredEvents: user.registeredEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/user/club/:clubId
// @desc   Toggle club membership
// @access Private
const toggleClub = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const clubId = req.params.clubId;
    const idx = user.joinedClubs.indexOf(clubId);
    if (idx === -1) {
      user.joinedClubs.push(clubId);
    } else {
      user.joinedClubs.splice(idx, 1);
    }
    await user.save();
    res.json({ success: true, joinedClubs: user.joinedClubs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/user/mentor/:mentorId
// @desc   Toggle mentor connection
// @access Private
const toggleMentor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const mentorId = req.params.mentorId;
    const idx = user.mentorConnections.indexOf(mentorId);
    if (idx === -1) {
      user.mentorConnections.push(mentorId);
    } else {
      user.mentorConnections.splice(idx, 1);
    }
    await user.save();
    res.json({ success: true, mentorConnections: user.mentorConnections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { updateProfile, toggleRsvp, toggleClub, toggleMentor };
