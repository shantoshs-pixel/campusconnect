const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  club: { type: String, required: true },
  location: { type: String, required: true },
  day: { type: String, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  seats: { type: Number, default: 30 },
  branch: { type: String, default: 'All' },
  icon: { type: String, default: 'calendar' },
  color: { type: String, default: 'blue' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
