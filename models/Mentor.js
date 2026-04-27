const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  expertise: { type: String, required: true },
  tags: { type: [String], default: [] },
  avatar: { type: String },
  avatarColor: { type: String, default: 'from-blue-400 to-indigo-500' },
  rating: { type: Number, default: 4.5 },
  sessions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', MentorSchema);
