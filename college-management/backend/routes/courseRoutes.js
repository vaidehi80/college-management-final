const express = require('express');
const router = express.Router();
const {
  getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse
} = require('../controllers/courseController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorizeRoles('admin'), createCourse);
router.put('/:id', protect, authorizeRoles('admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('admin'), deleteCourse);

module.exports = router;