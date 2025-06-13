const express = require('express');
const router = express.Router();
const examCtrl = require('./exam.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorizeRoles } = require('../../middleware/role.middleware');

// router.use(authenticate);// All routes require login
// router.use(authorizeRoles('admin')); // Only admin can access these

// Exam Routes
router.post('/',authenticate, authorizeRoles('admin') ,examCtrl.createExam);
router.get('/', examCtrl.getAllExams);
router.get('/:id', examCtrl.getExamById);
router.put('/:id', authenticate, authorizeRoles('admin'), examCtrl.updateExam);
router.delete('/:id', authenticate, authorizeRoles('admin'), examCtrl.deleteExam);
// Add this with your other routes
router.get('/:examId/calculate-points', authenticate, authorizeRoles('admin'), examCtrl.calculateTotalPoints);

// Question Routes
router.post('/:examId/questions', authenticate, authorizeRoles('admin'), examCtrl.addQuestion);
router.get('/:examId/questions', examCtrl.getQuestionsByExam);
router.get('/questions/:id',  examCtrl.getQuestionById);
router.delete('/questions/:id', authenticate, authorizeRoles('admin'), examCtrl.deleteQuestion);
router.put('/questions/:id', authenticate, authorizeRoles('admin'), examCtrl.updateQuestion);


module.exports = router;