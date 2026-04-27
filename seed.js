// seed.js — Run this ONCE to populate your database
// Command: node seed.js
require("dotenv").config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Event = require('./models/Event');
const Club = require('./models/Club');
const Mentor = require('./models/Mentor');

const events = [
  { id: 'ev1', title: 'Machine Learning Workshop', category: 'AI/ML', club: 'AI Club', location: 'CDT 101', day: 'Tuesday', start: 14, end: 16, seats: 18, branch: 'CSE', icon: 'brain', color: 'blue' },
  { id: 'ev2', title: 'Tech Career Fair 2024', category: 'Career', club: 'Placement Cell', location: 'Main Auditorium', day: 'Friday', start: 10, end: 16, seats: 200, branch: 'All', icon: 'briefcase', color: 'emerald' },
  { id: 'ev3', title: 'UX Design Sprint', category: 'Design', club: 'Design Hub', location: 'AB3 Studio', day: 'Tuesday', start: 16.5, end: 18, seats: 12, branch: 'All', icon: 'pen-tool', color: 'purple' },
  { id: 'ev4', title: 'Music Club Open Jam', category: 'Music', club: 'Music Club', location: 'Open Air Theatre', day: 'Wednesday', start: 18, end: 19.5, seats: 25, branch: 'All', icon: 'music', color: 'pink' },
  { id: 'ev5', title: 'Senior Mentor Mixer', category: 'Mentorship', club: 'Student Success Cell', location: 'SJT 402', day: 'Thursday', start: 17, end: 18.5, seats: 30, branch: 'All', icon: 'users', color: 'amber' },
  { id: 'ev6', title: 'Competitive Coding Contest', category: 'Coding', club: 'CP Club', location: 'Lab Complex', day: 'Saturday', start: 11, end: 13, seats: 20, branch: 'CSE', icon: 'code-2', color: 'cyan' },
  { id: 'ev7', title: 'Robotics Demo Day', category: 'Tech', club: 'Robotics Club', location: 'Workshop B', day: 'Monday', start: 15, end: 17, seats: 40, branch: 'All', icon: 'cpu', color: 'indigo' },
  { id: 'ev8', title: 'Photography Walk', category: 'Arts', club: 'Photography Club', location: 'VIT Gardens', day: 'Sunday', start: 7, end: 9, seats: 15, branch: 'All', icon: 'camera', color: 'rose' },
];

const clubs = [
  { id: 'cl1', name: 'AI/ML Club', category: 'Technical', members: 247, desc: 'Build real ML projects, compete in Kaggle, host weekly workshops.', icon: 'brain', color: 'blue', branch: 'CSE' },
  { id: 'cl2', name: 'Competitive Programming', category: 'Technical', members: 189, desc: 'Weekly contests, ICPC prep, and problem-solving sessions.', icon: 'code-2', color: 'cyan', branch: 'CSE' },
  { id: 'cl3', name: 'Music Club', category: 'Cultural', members: 156, desc: 'Open jam nights, band formation, and live performance practice.', icon: 'music', color: 'pink', branch: 'All' },
  { id: 'cl4', name: 'Design Hub', category: 'Creative', members: 133, desc: 'UI/UX, branding, product design sprints and portfolio reviews.', icon: 'pen-tool', color: 'purple', branch: 'All' },
  { id: 'cl5', name: 'Career Growth Cell', category: 'Professional', members: 201, desc: 'Resume reviews, mock interviews, placement preparation.', icon: 'briefcase', color: 'emerald', branch: 'All' },
  { id: 'cl6', name: 'Robotics Club', category: 'Technical', members: 98, desc: 'Build robots, compete in national contests, hands-on hardware.', icon: 'cpu', color: 'indigo', branch: 'All' },
  { id: 'cl7', name: 'Photography Club', category: 'Creative', members: 112, desc: 'Photo walks, editing workshops, exhibition planning.', icon: 'camera', color: 'rose', branch: 'All' },
  { id: 'cl8', name: 'Entrepreneurship Cell', category: 'Professional', members: 175, desc: 'Startup pitches, founder talks, VIT incubator access.', icon: 'rocket', color: 'amber', branch: 'All' },
];

const mentors = [
  { id: 'mn1', name: 'Riya Sharma', branch: 'CSE', year: '4th Year', expertise: 'AI/ML Projects & Research', tags: ['AI/ML', 'Python', 'Research'], avatar: 'RS', avatarColor: 'from-blue-400 to-indigo-500', rating: 4.9, sessions: 34 },
  { id: 'mn2', name: 'Arjun Nair', branch: 'ECE', year: '4th Year', expertise: 'Placements & Resume Reviews', tags: ['Career', 'Interviews', 'VLSI'], avatar: 'AN', avatarColor: 'from-emerald-400 to-teal-500', rating: 4.8, sessions: 52 },
  { id: 'mn3', name: 'Nisha Gupta', branch: 'CSE', year: '3rd Year', expertise: 'Club Leadership & Event Management', tags: ['Leadership', 'Design', 'Events'], avatar: 'NG', avatarColor: 'from-purple-400 to-pink-500', rating: 4.7, sessions: 21 },
  { id: 'mn4', name: 'Kavin Raj', branch: 'CSE', year: '4th Year', expertise: 'Competitive Programming & Hackathons', tags: ['CP', 'Algorithms', 'Hackathons'], avatar: 'KR', avatarColor: 'from-amber-400 to-orange-500', rating: 4.9, sessions: 41 },
  { id: 'mn5', name: 'Priya Menon', branch: 'IT', year: '3rd Year', expertise: 'Web Dev & Open Source', tags: ['Web', 'React', 'OSS'], avatar: 'PM', avatarColor: 'from-cyan-400 to-blue-500', rating: 4.6, sessions: 18 },
  { id: 'mn6', name: 'Dev Sharma', branch: 'ECE', year: '4th Year', expertise: 'Core Electronics & Internships', tags: ['Electronics', 'Internships', 'PCB'], avatar: 'DS', avatarColor: 'from-rose-400 to-pink-500', rating: 4.7, sessions: 29 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Event.deleteMany({});
    await Club.deleteMany({});
    await Mentor.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert fresh data
    await Event.insertMany(events);
    await Club.insertMany(clubs);
    await Mentor.insertMany(mentors);

    console.log(`✅ Seeded ${events.length} events`);
    console.log(`✅ Seeded ${clubs.length} clubs`);
    console.log(`✅ Seeded ${mentors.length} mentors`);
    console.log('🎉 Database ready!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
