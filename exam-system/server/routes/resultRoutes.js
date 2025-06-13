const express = require('express');
const router = express.Router();
const { submitExam, getResultsByStudent } = require('../controllers/resultController');
const { authenticate } = require('../middleware/auth.middleware');

// Student-only routes
router.use(authenticate);

router.post('/submit', (req, res, next) => {
  console.log('🎯 POST /api/results/submit called');
  next();
}, submitExam);


router.get('/:studentId', getResultsByStudent);

module.exports = router;
