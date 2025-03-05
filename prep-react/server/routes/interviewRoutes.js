const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Fetch all interviews (events)
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching interviews');
  }
});

// Schedule a new interview
router.post('/schedule', async (req, res) => {
  const { mentorId, menteeId, interviewDate, interviewTime } = req.body;

  try {
    const interview = new Interview({
      mentorId,
      menteeId,
      interviewDate: new Date(`${interviewDate}T${interviewTime}:00`), // Combine date and time
      interviewTime,
    });

    await interview.save();
    res.status(201).json(interview);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error scheduling interview');
  }
});

module.exports = router;
