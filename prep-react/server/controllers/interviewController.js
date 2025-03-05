const { google } = require('googleapis');
const Interview = require('../models/Interview');
const oauth2Client = require('../config/google');

// Function to authenticate Google Calendar API
const authenticateGoogle = (token) => {
  oauth2Client.setCredentials(token);
  return google.calendar({ version: 'v3', auth: oauth2Client });
};

// Function to create an event in Google Calendar
const scheduleInterview = async (req, res) => {
  const { mentorId, menteeId, interviewDate, interviewTime, token } = req.body;

  const calendar = authenticateGoogle(token);

  const event = {
    summary: Mock Interview with Mentor ${mentorId},
    description: Interview with Mentee ${menteeId},
    start: {
      dateTime: new Date(${interviewDate}T${interviewTime}), // Ensure proper formatting
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(new Date(${interviewDate}T${interviewTime}).getTime() + 60 * 60 * 1000), // 1 hour interview duration
      timeZone: 'UTC',
    },
  };

  try {
    const googleEvent = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    const newInterview = new Interview({
      mentorId,
      menteeId,
      interviewDate: googleEvent.data.start.dateTime,
      interviewTime,
      googleEventId: googleEvent.data.id,
    });

    await newInterview.save();
    res.status(200).json({ message: 'Interview scheduled successfully', event: googleEvent.data });
  } catch (error) {
    res.status(500).json({ error: 'Error scheduling the interview', message: error.message });
  }
};

module.exports = { scheduleInterview };