const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  members: { type: Number, default: 0 },
  desc: { type: String, required: true },
  icon: { type: String, default: 'users' },
  color: { type: String, default: 'blue' },
  branch: { type: String, default: 'All' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Club', ClubSchema);
