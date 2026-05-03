const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['BA', 'BSc', 'BCom', 'Other'], required: true },
  duration: { type: String, default: '3 Years' },
  eligibility: { type: String },
  fees: { type: Number },
  description: { type: String },
  syllabus: { type: String },
  totalSeats: { type: Number },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);