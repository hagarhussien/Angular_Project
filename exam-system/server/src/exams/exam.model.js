const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number }, // in minutes
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});


module.exports = mongoose.model('Exam', ExamSchema);