const express = require('express');
const router = express.Router();
const examCtrl = require('./exam.controller');

// Exam Routes
router.post('/', examCtrl.createExam);
router.get('/', examCtrl.getAllExams);
router.get('/:id', examCtrl.getExamById);
router.put('/:id', examCtrl.updateExam);
router.delete('/:id', examCtrl.deleteExam);

// Question Routes
router.post('/:examId/questions', examCtrl.addQuestion);
router.get('/:examId/questions', examCtrl.getQuestionsByExam);

module.exports = router;