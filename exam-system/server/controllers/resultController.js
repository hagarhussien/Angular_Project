const Result = require('../models/Result');
const Question = require('../models/Question');
const Exam = require('../models/Exam');

const submitExam = async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const questions = await Question.find({ examId });

    let score = 0;
    const total = questions.length;

    questions.forEach((q) => {
      const studentAnswer = answers.find(a => a.questionId === q._id.toString());
      const correctOptionIndex = q.options.findIndex(opt => opt.isCorrect);

      if (studentAnswer && studentAnswer.selectedOptionIndex === correctOptionIndex) {
        score += 1;
      }
    });

    const result = new Result({
      studentId,
      examId,
      score,
      total,
      answers
    });

    await result.save();

    res.status(201).json({ message: 'Exam submitted', score, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting exam', error });
  }
};

const getResultsByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const results = await Result.find({ studentId }).populate('examId', 'title');

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
};

module.exports = {
  submitExam,
  getResultsByStudent
};
