const express = require('express');
const Exam = require('../models/Exam');
const Question = require('../models/Question');
const router = express.Router();
const { getExamById, getAllPublishedExams } = require('../controllers/examController');
router.get('/', getAllPublishedExams);
router.get('/:id', getExamById);

module.exports = router;
