const express = require('express');
const router = express.Router();
const { getSchedule, addSlot, deleteSlot } = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getSchedule);
router.post('/', protect, addSlot);
router.delete('/:slotId', protect, deleteSlot);

module.exports = router;
