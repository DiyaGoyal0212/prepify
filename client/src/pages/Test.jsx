import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CurrentTests = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
    setIsDarkMode(document.documentElement.classList.contains("dark")); // Check dark mode state
  }, []);

  const tests = [
    { id: 1, title: "Java", color: "#6B46C1", hoverColor: "#553C9A" },
    { id: 2, title: "Python", color: "#3182CE", hoverColor: "#2B6CB0" },
    { id: 3, title: "History", color: "#38A169", hoverColor: "#2F855A" },
    { id: 4, title: "English", color: "#E53E3E", hoverColor: "#C53030" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header} data-aos="fade-up">
          <h1 style={styles.title}>
            Current <span style={styles.gradientText}>Tests</span>
          </h1>
          <p style={styles.description}>Here is a list of your current tests.</p>
        </div>

        <div style={styles.grid}>
          {tests.map((test) => (
            <div
              key={test.id}
              style={{ ...styles.card, backgroundColor: isDarkMode ? "#2D3748" : "white" }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 style={styles.cardTitle}>{test.title}</h2>
              <p style={styles.cardDescription}>Click below to start the test.</p>
              <Link
                to={`/test/${test.id}`}
                style={{
                  ...styles.button,
                  backgroundColor: test.color,
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = test.hoverColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = test.color)}
              >
                Start {test.title} Test
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    transition: "background-color 0.3s ease-in-out",
  },
  content: {
    maxWidth: "1200px",
    width: "100%",
    textAlign: "center",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#1A202C",
  },
  gradientText: {
    background: "linear-gradient(to right, #6B46C1, #3182CE)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  description: {
    fontSize: "18px",
    color: "#4A5568",
    marginTop: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2D3748",
  },
  cardDescription: {
    fontSize: "16px",
    color: "#4A5568",
    margin: "10px 0",
  },
  button: {
    display: "inline-block",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out",
  },
};

export default CurrentTests;
