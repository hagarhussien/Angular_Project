const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: {
    type:String,
    ref: 'User',
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: '../src/exams/question.model' },
      selectedOptionIndex: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
