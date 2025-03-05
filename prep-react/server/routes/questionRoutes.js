const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch predefined questions (previous code stays unchanged)
router.get('/:role', (req, res) => {
  const role = req.params.role;
  const difficulty = req.query.difficulty || 'easy';  // Default to 'easy' if no difficulty is selected

  console.log('Role:', role);
  console.log('Difficulty:', difficulty);

  const questions = {
    React: {
      easy: ['What is JSX?', 'Explain React lifecycle methods.'],
      medium: ['What is the virtual DOM?', 'What is state and props in React?'],
      hard: ['Explain React Hooks.', 'What is Context API in React?'],
    },
    java: {
      easy: ['What is Java?', "What is the difference between == and equals() in Java?","What are the four pillars of OOP?",

      ],
      medium: ['Explain object-oriented programming in Java.', 'What is the difference between checked and unchecked exceptions in Java?', 'What is the difference between abstract class and interface in Java?'],
      hard: ['What is the difference between JDK, JRE, and JVM?', 'What is the difference between String, StringBuilder, and StringBuffer in Java?', 'What is the difference between static and instance methods in Java?', 'What is the difference between method overloading and method overriding in Java?'],
    },
    cpp: {
      easy: ['What is cpp?', 'What is the difference between C and C++?'],
      medium: ['Explain object-oriented programming in cpp.', 'What is the difference between class and structure in cpp?'],
      hard: ['What is the difference between JDK, JRE, and JVM?', 'What is the difference between String, StringBuilder, and StringBuffer in cpp?', 'What is the difference between static and instance methods in cpp?', 'What is the difference between method overloading and method overriding in cpp?'],
    },
    // Add other roles similarly
  };

  if (questions[role] && questions[role][difficulty]) {
    res.json({ questions: questions[role][difficulty] });
  } else {
    res.json({ questions: [] });  
  }
});



// Fetch dynamic questions from Open Trivia Database (OpenTDB)
router.post('/generate', async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  // Request questions from the OpenTDB API
  try {
    console.log(`Fetching trivia questions for role: ${role}`);

    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 5,          // Limiting to 5 questions as per your request
        category: 18,       // General Knowledge category
        difficulty: 'easy', // Easy difficulty
        type: 'multiple',  // Multiple choice type
      },
    });

    // Extract questions from the OpenTDB response
    const questions = response.data.results.map((item) => item.question);

    res.json({ questions: questions });

  } catch (error) {
    console.error('Error fetching questions:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

module.exports = router;
