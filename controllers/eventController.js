const Event = require('../models/Event');

// @route  GET /api/events
// @desc   Get all events
// @access Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/events/:id
// @desc   Get single event
// @access Public
const getEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEvents, getEvent };
