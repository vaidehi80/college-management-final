const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

// Get all gallery images
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: gallery.length, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new image (Admin only)
exports.createGallery = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
    if (!image) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }
    const gallery = await Gallery.create({
      ...req.body,
      image,
      uploadedBy: req.user._id
    });
    res.status(201).json({ success: true, message: 'Image uploaded successfully', gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update image — title, description, category, or replace image (Admin only)
exports.updateGallery = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // If new image uploaded, delete old one and use new
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads', galleryItem.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      req.body.image = req.file.filename;
    }

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Image updated successfully', gallery: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete image — soft delete (Admin only)
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};