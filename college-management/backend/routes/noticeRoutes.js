const express = require('express');
const router = express.Router();
const {
  getAllNotices, createNotice, updateNotice, deleteNotice
} = require('../controllers/noticeController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllNotices);
router.post('/', protect, authorizeRoles('admin', 'staff'), createNotice);
router.put('/:id', protect, authorizeRoles('admin', 'staff'), updateNotice);
router.delete('/:id', protect, authorizeRoles('admin'), deleteNotice);

module.exports = router;