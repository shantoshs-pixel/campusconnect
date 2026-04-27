const User = require('../models/User');

// @route  GET /api/schedule
// @desc   Get user's schedule
// @access Private
const getSchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/schedule
// @desc   Add a schedule slot
// @access Private
const addSlot = async (req, res) => {
  try {
    const { title, start, end } = req.body;
    if (!title || start === undefined || end === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide title, start, and end' });
    }
    if (start >= end || start < 8 || end > 20) {
      return res.status(400).json({ success: false, message: 'Invalid time range. Use 8-20 in 24h format.' });
    }
    const user = await User.findById(req.user._id);
    const slot = { id: 'sl_' + Date.now(), title, start, end };
    user.schedule.push(slot);
    await user.save();
    res.json({ success: true, schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/schedule/:slotId
// @desc   Remove a schedule slot
// @access Private
const deleteSlot = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.schedule = user.schedule.filter(s => s.id !== req.params.slotId);
    await user.save();
    res.json({ success: true, schedule: user.schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSchedule, addSlot, deleteSlot };
