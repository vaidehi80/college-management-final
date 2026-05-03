const express = require('express');
const router = express.Router();
const {
  uploadResult, getMyResults, getResultByStudent,
  getAllResults, updateResult, deleteResult
} = require('../controllers/resultController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, authorizeRoles('staff', 'admin'), uploadResult);
router.get('/', protect, authorizeRoles('admin'), getAllResults);
router.get('/my', protect, authorizeRoles('student'), getMyResults);
router.get('/:studentId', protect, authorizeRoles('staff', 'admin'), getResultByStudent);
router.put('/:id', protect, authorizeRoles('staff', 'admin'), updateResult);
router.delete('/:id', protect, authorizeRoles('admin'), deleteResult);

module.exports = router;