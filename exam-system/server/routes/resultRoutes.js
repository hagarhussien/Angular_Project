const express = require('express');
const router = express.Router();
const { submitExam, getResultsByStudent } = require('../controllers/resultController');

router.post('/submit', submitExam);

router.get('/:studentId', getResultsByStudent);

module.exports = router;
