# Campus Connect+ — Complete Setup Guide

## Your project structure
```
campusconnect/
├── server.js              ← Main server (runs everything)
├── .env                   ← Your secret config
├── seed.js                ← Populates database with events/clubs/mentors
├── package.json
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Club.js
│   ├── Mentor.js
│   └── Schedule.js
├── controllers/
│   ├── authController.js  ← register, login
│   ├── userController.js  ← profile, RSVP, join club, connect mentor
│   ├── eventController.js
│   ├── clubController.js
│   ├── mentorController.js
│   └── scheduleController.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── eventRoutes.js
│   ├── clubRoutes.js
│   ├── mentorRoutes.js
│   └── scheduleRoutes.js
├── middleware/
│   └── authMiddleware.js  ← JWT token check
└── public/                ← All your HTML/CSS/JS files
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── dashboard.html
    ├── events.html
    ├── clubs.html
    ├── mentors.html
    ├── app.js
    └── styles.css
```

---

## Step 1 — Install MongoDB
Download from: https://www.mongodb.com/try/download/community
- Install it, it runs as a background service automatically
- Default port: 27017 (your .env already uses this)

## Step 2 — Install Node.js (if not installed)
Download from: https://nodejs.org → LTS version

## Step 3 — Open your project folder in terminal
```bash
# Right-click your project folder → "Open in Terminal"
# OR in VS Code: Terminal → New Terminal
cd path/to/your/campusconnect
```

## Step 4 — Install packages
```bash
npm install
```
(This installs express, mongoose, bcryptjs, jsonwebtoken, etc.)

## Step 5 — Seed the database (run ONCE)
```bash
node seed.js
```
You should see:
```
✅ Connected to MongoDB
✅ Seeded 8 events
✅ Seeded 8 clubs
✅ Seeded 6 mentors
🎉 Database ready!
```

## Step 6 — Start the server
```bash
node server.js
```
You should see:
```
✅ MongoDB Connected: 127.0.0.1
✅ Server running on http://localhost:5000
```

## Step 7 — Open the website
Go to: http://localhost:5000

That's it! The whole website runs from that URL.

---

## How it all works (simple explanation)

```
Browser (your HTML)
    ↓ clicks "Sign Up"
    ↓ sends POST request to http://localhost:5000/api/auth/register
    ↓
server.js receives it
    ↓ routes it to authRoutes.js
    ↓ authRoutes calls authController.js
    ↓ controller saves user to MongoDB
    ↓ sends back a JWT token (like a login ticket)
    ↓
Browser stores the token
    ↓ uses it for every protected action (RSVP, join club, etc.)
```

## API Endpoints (what the frontend calls)

| Method | URL | What it does |
|--------|-----|--------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Sign in |
| GET | /api/auth/me | Get my profile |
| PUT | /api/user/profile | Update profile |
| POST | /api/user/rsvp/:id | RSVP / cancel event |
| POST | /api/user/club/:id | Join / leave club |
| POST | /api/user/mentor/:id | Connect / disconnect mentor |
| GET | /api/events | All events |
| GET | /api/clubs | All clubs |
| GET | /api/mentors | All mentors |
| POST | /api/schedule | Add schedule slot |
| DELETE | /api/schedule/:id | Remove schedule slot |

## If something goes wrong

**MongoDB not connecting:**
- Make sure MongoDB is installed and running
- Check Task Manager → look for "mongod" process

**Port already in use:**
- Change PORT=5001 in .env

**"Cannot find module":**
- Run `npm install` again

**Demo account for testing:**
- Click "Try Demo Account" on the login page
- Email: ananya@vitstudent.ac.in / Password: demo123
