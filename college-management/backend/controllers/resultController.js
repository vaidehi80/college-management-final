const Result = require('../models/Result');
const Student = require('../models/Student');

exports.uploadResult = async (req, res) => {
  try {
    const result = await Result.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json({ success: true, message: 'Result uploaded successfully', result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyResults = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    const results = await Result.find({ student: student._id })
      .populate('course', 'name code')
      .sort({ year: -1, semester: -1 });
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getResultByStudent = async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate('course', 'name code')
      .sort({ year: -1, semester: -1 });
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
      .populate('course', 'name code')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: results.length, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.status(200).json({ success: true, message: 'Result updated successfully', result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};