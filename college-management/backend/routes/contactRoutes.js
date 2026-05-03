const express = require('express');
const router = express.Router();
const { createContact, getAllContacts, markAsRead } = require('../controllers/contactController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', createContact);
router.get('/', protect, authorizeRoles('admin'), getAllContacts);
router.put('/:id/read', protect, authorizeRoles('admin'), markAsRead);

module.exports = router;