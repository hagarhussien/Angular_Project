const Exam = require('../models/Exam');
const Question = require('../models/Question');

const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam || !exam.isPublished) {
      return res.status(404).json({ message: 'Exam not found or not published' });
    }

    const questions = exam.questions.map(q => {
      const options = q.options.map(opt => ({
        text: opt.text,
      }));
      return {
        _id: q._id,
        text: q.text,
        options
      };
    });

    res.json({
      exam: {
        title: exam.title,
        duration: exam.duration,
        questions
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllPublishedExams = async (req, res) => {
  try {
    const exams = await Exam.find({ isPublished: true });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exams' });
  }
};

module.exports = {
  getExamById,
  getAllPublishedExams
};