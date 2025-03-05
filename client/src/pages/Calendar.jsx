import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const InterviewScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState({
    mentorId: '',
    menteeId: '',
    interviewDate: '',
    interviewTime: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/interviews')
      .then(response => {
        const eventList = response.data.map(event => ({
          title: `Interview with ${event.mentorId}`,
          start: new Date(event.interviewDate),
          end: new Date(new Date(event.interviewDate).getTime() + 60 * 60 * 1000),
        }));
        setEvents(eventList);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const onDateChange = (newDate) => {
    setDate(newDate);
    setInterviewDetails({ ...interviewDetails, interviewDate: newDate.toISOString().split('T')[0] });
  };

  const handleSchedule = () => {
    axios.post('http://localhost:8080/api/interviews/schedule', interviewDetails)
      .then(response => {
        setEvents([
          ...events,
          {
            title: `Interview with ${interviewDetails.mentorId}`,
            start: new Date(interviewDetails.interviewDate + 'T' + interviewDetails.interviewTime),
            end: new Date(new Date(interviewDetails.interviewDate + 'T' + interviewDetails.interviewTime).getTime() + 60 * 60 * 1000),
          },
        ]);
        alert('Interview scheduled successfully');
      })
      .catch(error => {
        console.error('Error scheduling interview:', error);
        alert('Error scheduling interview');
      });
  };

  return (
    <div style={styles.schedulerContainer}>
      <h2 style={styles.title}>Interview Scheduler</h2>

      <div style={styles.calendarContainer}>
        <Calendar onChange={onDateChange} value={date} />
      </div>

      <div style={styles.formGroup}>
        <label>Mentor ID</label>
        <input
          type="text"
          value={interviewDetails.mentorId}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, mentorId: e.target.value })}
          placeholder="Enter mentor's ID"
          style={styles.inputField}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Mentee ID</label>
        <input
          type="text"
          value={interviewDetails.menteeId}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, menteeId: e.target.value })}
          placeholder="Enter mentee's ID"
          style={styles.inputField}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Interview Time</label>
        <input
          type="time"
          value={interviewDetails.interviewTime}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewTime: e.target.value })}
          style={styles.inputField}
        />
      </div>

      <button onClick={handleSchedule} style={styles.scheduleButton}>
        Schedule Interview
      </button>

      <div style={styles.eventList}>
        <h3 style={styles.subTitle}>Scheduled Interviews:</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index} style={styles.eventItem}>
              <strong>{event.title}</strong> - {event.start.toLocaleString()} to {event.end.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  schedulerContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  calendarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  scheduleButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  eventList: {
    marginTop: '20px',
  },
  eventItem: {
    background: '#f8f8f8',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '5px',
  },
  subTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
};

export default InterviewScheduler;
