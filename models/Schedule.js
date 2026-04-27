const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slots: [{
    id: String,
    title: String,
    start: Number,
    end: Number
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
