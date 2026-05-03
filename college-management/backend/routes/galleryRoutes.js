const express = require('express');
const router = express.Router();
const { getAllGallery, createGallery, deleteGallery } = require('../controllers/galleryController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllGallery);
router.post('/', protect, authorizeRoles('admin'), createGallery);
router.delete('/:id', protect, authorizeRoles('admin'), deleteGallery);

module.exports = router;