const Gallery = require('../models/Gallery');

exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: gallery.length, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : '';
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