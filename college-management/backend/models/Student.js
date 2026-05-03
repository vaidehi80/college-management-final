const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rollNumber: { type: String, required: true, unique: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  year: { type: Number, enum: [1, 2, 3] },
  section: { type: String },
  admissionYear: { type: Number },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Female', 'Other'] },
  guardianName: { type: String },
  guardianPhone: { type: String },
  feesPaid: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);