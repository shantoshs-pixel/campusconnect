const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const eventRoutes = require('./routes/eventRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all HTML/CSS/JS files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// ── API Health Check ──────────────────────────────────────────
app.get('/api/health', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Campus Connect API is running'
  });
});

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/schedule', scheduleRoutes);

// ── Serve HTML pages ─────────────────────────────────────────
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/events', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'events.html'));
});
app.get('/clubs', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'clubs.html'));
});
app.get('/mentors', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'mentors.html'));
});

// ── 404 Handler ───────────────────────────────────────────────
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ── Error Handler ─────────────────────────────────────────────
app.use(function (error, req, res, next) {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message
  });
});

app.listen(PORT, function () {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from /public`);
  console.log(`🔌 API available at http://localhost:${PORT}/api`);
});
