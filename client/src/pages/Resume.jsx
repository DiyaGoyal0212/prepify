import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

const Resume = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setResumeFile(file);
      analyzeResume(file);
    }
  };

  const analyzeResume = (file) => {
    // Simulating ATS Score and Suggestions (Replace with real API logic)
    const randomScore = Math.floor(Math.random() * 50) + 50; // Random score between 50-100
    setAtsScore(randomScore);

    const sampleSuggestions = [
      "Use more industry-relevant keywords.",
      "Optimize formatting for ATS readability.",
      "Include measurable achievements in work experience.",
      "Ensure a professional summary at the top.",
      "Add more action verbs to describe skills."
    ];
    setSuggestions(sampleSuggestions);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resume Analyzer</h1>
      <p style={styles.subtitle}>
        Upload your resume and get an ATS Score along with improvement suggestions.
      </p>

      {/* Upload Section */}
      <div style={styles.uploadBox}>
        <label style={styles.uploadLabel}>
          <FaUpload />
          Upload Resume
          <input type="file" accept=".pdf,.doc,.docx" style={styles.hiddenInput} onChange={handleFileUpload} />
        </label>

        {resumeFile && <p style={styles.uploadedText}>Uploaded: {resumeFile.name}</p>}
      </div>

      {/* ATS Score Section */}
      {atsScore !== null && (
        <div style={styles.scoreBox}>
          <h2 style={styles.scoreText}>ATS Score: {atsScore}/100</h2>
          <p style={styles.scoreDescription}>Higher score means better chances of passing ATS filters.</p>
        </div>
      )}

      {/* Improvement Suggestions */}
      {suggestions.length > 0 && (
        <div style={styles.suggestionsBox}>
          <h3 style={styles.suggestionsTitle}>How to Improve:</h3>
          <ul style={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <li key={index} style={styles.suggestionItem}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #00796b, #004d40)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    paddingTop: "64px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: "10px",
    color: "#cfd8dc",
    textAlign: "center",
    maxWidth: "400px",
  },
  uploadBox: {
    marginTop: "24px",
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#00796b",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  uploadLabel: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    backgroundColor: "#00796b",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
  uploadedText: {
    marginTop: "10px",
    color: "#555",
  },
  hiddenInput: {
    display: "none",
  },
  scoreBox: {
    marginTop: "24px",
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#00796b",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  scoreText: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  scoreDescription: {
    color: "#555",
    marginTop: "5px",
  },
  suggestionsBox: {
    marginTop: "24px",
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#00796b",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  suggestionsTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  suggestionsList: {
    marginTop: "10px",
    listStyleType: "disc",
    paddingLeft: "20px",
    textAlign: "left",
    color: "#555",
  },
  suggestionItem: {
    marginTop: "5px",
  }
};

export default Resume;
