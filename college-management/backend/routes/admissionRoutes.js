const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const uploadFields = upload.fields([
  { name: 'studentPhoto', maxCount: 1 },
  { name: 'aadharPhoto', maxCount: 1 },
  { name: 'sscMarksheet', maxCount: 1 },
  { name: 'hscMarksheet', maxCount: 1 },
  { name: 'gapCertificate', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
  { name: 'casteValidityCertificate', maxCount: 1 },
]);

router.post('/', uploadFields, async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files) {
      if (req.files.studentPhoto) data.studentPhoto = req.files.studentPhoto[0].filename;
      if (req.files.aadharPhoto) data.aadharPhoto = req.files.aadharPhoto[0].filename;
      if (req.files.sscMarksheet) data.sscMarksheet = req.files.sscMarksheet[0].filename;
      if (req.files.hscMarksheet) data.hscMarksheet = req.files.hscMarksheet[0].filename;
      if (req.files.gapCertificate) data.gapCertificate = req.files.gapCertificate[0].filename;
      if (req.files.casteCertificate) data.casteCertificate = req.files.casteCertificate[0].filename;
      if (req.files.casteValidityCertificate) data.casteValidityCertificate = req.files.casteValidityCertificate[0].filename;
    }
    const admission = await Admission.create(data);
    res.status(201).json({ success: true, message: 'Application submitted!', admission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate('course', 'name type')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: admissions.length, admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, admission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;