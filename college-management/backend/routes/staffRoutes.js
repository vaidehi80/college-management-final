const express = require('express');
const router = express.Router();
const {
  getAllStaff, getStaffById, getMyProfile,
  createStaff, updateStaff, deleteStaff
} = require('../controllers/staffController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', protect, authorizeRoles('admin'), getAllStaff);
router.get('/my-profile', protect, authorizeRoles('staff'), getMyProfile);
router.get('/:id', protect, authorizeRoles('admin'), getStaffById);
router.post('/', protect, authorizeRoles('admin'), createStaff);
router.put('/:id', protect, authorizeRoles('admin'), updateStaff);
router.delete('/:id', protect, authorizeRoles('admin'), deleteStaff);

module.exports = router;