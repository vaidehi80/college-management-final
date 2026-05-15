const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true },
  otp: { type: String, required: true },
  purpose: { type: String, enum: ['login', 'register'], default: 'login' },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: 300 }
});

module.exports = mongoose.model('OTP', otpSchema);
