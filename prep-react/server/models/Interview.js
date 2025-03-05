const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  mentorId: String,
  menteeId: String,
  interviewDate: Date,
  interviewTime: String, // Time format 'HH:mm'
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Interview', interviewSchema);
