const express = require('express');
const router = express.Router();
const {
  getAllEvents, createEvent, updateEvent, deleteEvent
} = require('../controllers/eventController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllEvents);
router.post('/', protect, authorizeRoles('admin'), createEvent);
router.put('/:id', protect, authorizeRoles('admin'), updateEvent);
router.delete('/:id', protect, authorizeRoles('admin'), deleteEvent);

module.exports = router;