const express = require('express');
const router = express.Router();
const {
  markAttendance, getAttendanceByStudent,
  getMyAttendance, getAttendanceBySubject, bulkMarkAttendance
} = require('../controllers/attendanceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, authorizeRoles('staff', 'admin'), markAttendance);
router.post('/bulk', protect, authorizeRoles('staff', 'admin'), bulkMarkAttendance);
router.get('/my', protect, authorizeRoles('student'), getMyAttendance);
router.get('/subject', protect, authorizeRoles('staff', 'admin'), getAttendanceBySubject);
router.get('/:studentId', protect, authorizeRoles('staff', 'admin'), getAttendanceByStudent);

module.exports = router;