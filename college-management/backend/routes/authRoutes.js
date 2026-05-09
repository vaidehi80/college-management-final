const express = require('express');
const router = express.Router();
const {
  register,
  registerStudent,
  login,
  verifyOTP,
  resendOTP,
  getMe,
  updateProfile,
  changePassword,
  getAllStudentUsers,
  deleteStudentUser
} = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

// Admin-only
router.post('/register', protect, authorizeRoles('admin'), register);

// Staff/Admin
router.post('/register-student', protect, authorizeRoles('staff', 'admin'), registerStudent);
router.get('/students', protect, authorizeRoles('staff', 'admin'), getAllStudentUsers);
router.delete('/students/:id', protect, authorizeRoles('staff', 'admin'), deleteStudentUser);

// Authenticated user
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
