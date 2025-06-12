const express = require('express');
const router = express.Router();
const { submitExam, getResultsByStudent } = require('../controllers/resultController');
router.post('/submit', (req, res, next) => {
  console.log('🎯 POST /api/results/submit called');
  next();
}, submitExam);


router.get('/:studentId', getResultsByStudent);

module.exports = router;
