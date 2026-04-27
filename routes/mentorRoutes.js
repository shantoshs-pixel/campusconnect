const express = require('express');
const router = express.Router();
const { getMentors, getMentor } = require('../controllers/mentorController');

router.get('/', getMentors);
router.get('/:id', getMentor);

module.exports = router;
