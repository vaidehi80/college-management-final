const express = require('express');
const router = express.Router();
const {
  getAllFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty
} = require('../controllers/facultyController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllFaculty);
router.get('/:id', getFacultyById);
router.post('/', protect, authorizeRoles('admin'), createFaculty);
router.put('/:id', protect, authorizeRoles('admin'), updateFaculty);
router.delete('/:id', protect, authorizeRoles('admin'), deleteFaculty);

module.exports = router;