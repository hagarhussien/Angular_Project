const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/:id', async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    res.json(q);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching question' });
  }
});

module.exports = router;
