import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useReactToPrint } from "react-to-print";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentName = queryParams.get("name") || "Student";

  const certificateRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: "Certificate",
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        color: "#1a202c",
        padding: "24px",
        position: "relative",
      }}
    >
      {windowSize.width > 0 && <Confetti width={windowSize.width} height={windowSize.height} />}

      <div
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "32px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#3b82f6" }}>🎉 Thank You! 🎉</h1>
        <p style={{ fontSize: "18px", color: "#4b5563", marginTop: "16px" }}>
          You have successfully submitted your test.
        </p>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>
          Your results will be available soon.
        </p>

        <button
          onClick={() => navigate(`/certificate?name=${studentName}`)}
          style={{
            marginTop: "24px",
            backgroundColor: "#10b981",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
        >
          🎓 View Certificate
        </button>
      </div>

      <div style={{ display: "none" }}>
        <div
          ref={certificateRef}
          style={{
            width: "600px",
            padding: "40px",
            backgroundColor: "white",
            textAlign: "center",
            border: "1px solid #d1d5db",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Certificate of Completion</h1>
          <p style={{ fontSize: "18px", marginTop: "16px" }}>This is to certify that</p>
          <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#3b82f6", marginTop: "8px" }}>
            {studentName}
          </h2>
          <p style={{ fontSize: "18px", marginTop: "16px" }}>has successfully completed the test.</p>
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
            }}
          >
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Instructor: EduWeb Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
