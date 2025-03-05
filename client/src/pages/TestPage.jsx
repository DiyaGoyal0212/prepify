import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [codeAnswer, setCodeAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leaveWarnings, setLeaveWarnings] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState({ top: 10, right: 10 });

  const testContainerRef = useRef(null);
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);

  useEffect(() => {
    fetchTest();
    startCamera();

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      stopCamera();
      exitFullScreen();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [testId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchTest = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/tests/${testId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTest(data);
    } catch (error) {
      console.error("Error fetching test data:", error.message);
    }
  };

  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => console.error("Fullscreen request failed:", err));
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "You have an ongoing test. Are you sure you want to leave?";
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setLeaveWarnings((prev) => {
        if (prev + 1 >= 3) {
          handleSubmit();
        }
        return prev + 1;
      });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      cameraStreamRef.current = stream;
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const handleDragCamera = (event) => {
    setCameraPosition({ top: event.clientY - 50, right: window.innerWidth - event.clientX - 50 });
  };

  const handleNextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    stopCamera();
    exitFullScreen();

    try {
      await fetch("http://localhost:5000/api/submit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testId, answers: mcqAnswers, codeAnswer }),
      });
      console.log("Test submitted successfully");
    } catch (error) {
      console.error("Error submitting test:", error);
    }

    setTimeout(() => navigate("/Thankyou"), 2000);
  };

  if (!test || !test.questions) return <div style={styles.loading}>Loading test...</div>;

  return (
    <div ref={testContainerRef} style={styles.container}>
      <h1 style={styles.title}>{test.title} Test</h1>
      <button onClick={requestFullScreen} style={styles.startButton}>
        Start Test (Fullscreen)
      </button>

      <p style={styles.timer}>
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>
      <p style={styles.questionCount}>
        Question {currentQuestionIndex + 1} of {test.questions.length}
      </p>

      <p style={styles.questionText}>{test.questions[currentQuestionIndex].text}</p>

      {test.questions[currentQuestionIndex].type === "mcq" && (
        <div style={styles.mcqContainer}>
          {test.questions[currentQuestionIndex].options.map((option, index) => (
            <label key={index} style={styles.optionLabel}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={mcqAnswers[currentQuestionIndex] === option}
                onChange={() => setMcqAnswers({ ...mcqAnswers, [currentQuestionIndex]: option })}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {test.questions[currentQuestionIndex].type === "coding" && (
        <div style={styles.editorContainer}>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            defaultValue={codeAnswer}
            onChange={(value) => setCodeAnswer(value)}
            theme="vs-dark"
          />
        </div>
      )}

      <div style={styles.navButtons}>
        <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} style={styles.button}>
          Previous
        </button>
        {currentQuestionIndex < test.questions.length - 1 ? (
          <button onClick={handleNextQuestion} style={styles.button}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit Test
          </button>
        )}
      </div>

      {cameraActive && (
        <div
          style={{ ...styles.cameraContainer, top: cameraPosition.top, right: cameraPosition.right }}
          onMouseMove={handleDragCamera}
        >
          <video ref={videoRef} autoPlay playsInline style={styles.video} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#343a40",
    marginBottom: "15px",
  },
  startButton: {
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  startButtonHover: {
    backgroundColor: "#218838",
  },
  timer: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#dc3545",
    margin: "10px 0",
  },
  questionCount: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#6c757d",
  },
  questionText: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#495057",
    margin: "15px 0",
  },
  mcqContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "500",
    color: "#212529",
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
    width: "300px",
    cursor: "pointer",
    transition: "0.3s",
  },
  optionLabelHover: {
    backgroundColor: "#e9ecef",
  },
  editorContainer: {
    width: "80%",
    maxWidth: "800px",
    margin: "20px auto",
    border: "2px solid #007bff",
    borderRadius: "8px",
    overflow: "hidden",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  submitButton: {
    padding: "12px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#c82333",
  },
  cameraContainer: {
    position: "fixed",
    width: "120px",
    height: "90px",
    borderRadius: "10px",
    overflow: "hidden",
    border: "2px solid #007bff",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "grab",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};


export default TestPage;
