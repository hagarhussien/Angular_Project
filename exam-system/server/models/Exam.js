const mongoose = require('mongoose');
const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
     questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question' 
    }
  ]

});

module.exports = mongoose.model('Exam', examSchema);
