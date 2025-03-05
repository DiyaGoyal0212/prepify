import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CppQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('React'); // Default role
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty

  // Function to fetch predefined questions
  const fetchQuestions = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/questions/${role}`, {
        params: { difficulty }, 
      });
      console.log('Predefined questions:', result.data);
      setQuestions(result.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };
  
  // Function to generate dynamic questions using QuizAPI
  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/questions/generate', { role, difficulty });
      console.log('Generated Questions:', response.data.questions);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.error || 'Failed to generate questions'}`);
      } else {
        alert('Error: Failed to connect to the server');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch predefined questions for the default role and difficulty when component mounts
  useEffect(() => {
    fetchQuestions();
  }, [role, difficulty]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Interview Questions for {role}</h1>

      {/* Difficulty Dropdown */}
      <div style={styles.dropdownContainer}>
        <label htmlFor="difficulty" style={styles.label}>Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={styles.select}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Display the list of questions */}
      <ul style={styles.questionList}>
        {questions.map((question, index) => (
          <li key={index} style={styles.questionItem}>
            {question}
          </li>
        ))}
      </ul>

      {/* Button to generate new questions */}
      <button
        onClick={generateQuestions}
        style={loading ? styles.buttonDisabled : styles.button}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate New Questions'}
      </button>
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    marginTop: '100px',
    padding: '24px',
    backgroundColor: '#f8f9fa',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  questionList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
  questionItem: {
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonDisabled: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'not-allowed',
  },
};

export default CppQuestionsPage;
