const express = require('express');
const router = express.Router();
const { getClubs, getClub } = require('../controllers/clubController');

router.get('/', getClubs);
router.get('/:id', getClub);

module.exports = router;
