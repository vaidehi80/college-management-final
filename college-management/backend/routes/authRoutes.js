const express = require('express');
const router = express.Router();
const {
  register,
  registerStudent,
  login,
  getMe,
  updateProfile,
  changePassword,
  getAllStudentUsers,
  deleteStudentUser
} = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);

// Admin-only: register staff or admin
router.post('/register', protect, authorizeRoles('admin'), register);

// Staff/Admin: register a student (auto-generates password)
router.post('/register-student', protect, authorizeRoles('staff', 'admin'), registerStudent);

// Staff/Admin: list all students
router.get('/students', protect, authorizeRoles('staff', 'admin'), getAllStudentUsers);

// Staff/Admin: delete a student
router.delete('/students/:id', protect, authorizeRoles('staff', 'admin'), deleteStudentUser);

// Authenticated user
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;