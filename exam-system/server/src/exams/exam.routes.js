const express = require('express');
const router = express.Router();
const examCtrl = require('./exam.controller');

// Exam Routes
router.post('/', examCtrl.createExam);
router.get('/', examCtrl.getAllExams);
router.get('/:id', examCtrl.getExamById);
router.put('/:id', examCtrl.updateExam);
router.delete('/:id', examCtrl.deleteExam);
// Add this with your other routes
router.get('/:examId/calculate-points', examCtrl.calculateTotalPoints);

// Question Routes
router.post('/:examId/questions', examCtrl.addQuestion);
router.get('/:examId/questions', examCtrl.getQuestionsByExam);
router.get('/questions/:id', examCtrl.getQuestionById);
router.delete('/questions/:id', examCtrl.deleteQuestion);
router.put('/questions/:id', examCtrl.updateQuestion);
module.exports = router;