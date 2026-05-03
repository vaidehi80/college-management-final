const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  endDate: { type: Date },
  venue: { type: String },
  category: {
    type: String,
    enum: ['cultural', 'sports', 'academic', 'other'],
    default: 'academic'
  },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);