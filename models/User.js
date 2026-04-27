const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false  // don't return password by default
  },
  branch: {
    type: String,
    enum: ['CSE', 'ECE', 'IT', 'Mech', 'Civil', 'EEE'],
    default: 'CSE'
  },
  year: {
    type: String,
    enum: ['1', '2', '3', '4'],
    default: '1'
  },
  interests: {
    type: [String],
    default: []
  },
  joinedClubs: {
    type: [String],   // array of club IDs
    default: []
  },
  registeredEvents: {
    type: [String],   // array of event IDs
    default: []
  },
  mentorConnections: {
    type: [String],   // array of mentor IDs
    default: []
  },
  schedule: {
    type: [{
      id: String,
      title: String,
      start: Number,
      end: Number
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
