const express = require('express');
const router = express.Router();
const {
  getAllStudents, getStudentById, getMyProfile,
  createStudent, updateStudent, deleteStudent
} = require('../controllers/studentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', protect, authorizeRoles('admin', 'staff'), getAllStudents);
router.get('/my-profile', protect, authorizeRoles('student'), getMyProfile);
router.get('/:id', protect, authorizeRoles('admin', 'staff'), getStudentById);
router.post('/', protect, authorizeRoles('admin'), createStudent);
router.put('/:id', protect, authorizeRoles('admin', 'staff'), updateStudent);
router.delete('/:id', protect, authorizeRoles('admin'), deleteStudent);

module.exports = router;