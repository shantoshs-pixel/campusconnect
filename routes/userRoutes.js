const express = require('express');
const router = express.Router();
const { updateProfile, toggleRsvp, toggleClub, toggleMentor } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateProfile);
router.post('/rsvp/:eventId', protect, toggleRsvp);
router.post('/club/:clubId', protect, toggleClub);
router.post('/mentor/:mentorId', protect, toggleMentor);

module.exports = router;
