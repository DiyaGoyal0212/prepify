import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate

const InterviewOptions = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleTextInterviewClick = () => {
    navigate("/text-base"); // Navigate to the TextInterview component
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
          Choose Interview Type
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            onClick={handleTextInterviewClick}
            style={{
              backgroundColor: "#66b3ff",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#5299e6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#66b3ff")}
          >
            Text-Based Interview
          </button>
          <button
            style={{
              backgroundColor: "#66b3ff",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              cursor: "not-allowed",
              opacity: "0.5",
            }}
            disabled
          >
            Audio/Video-Based Interview (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewOptions;
