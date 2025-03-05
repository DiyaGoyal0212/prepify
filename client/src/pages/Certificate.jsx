import React from "react";
import { useLocation } from "react-router-dom";

const printCertificate = () => {
  let studentName = prompt("Enter the student's name:", "Student");

  if (!studentName || studentName.trim() === "") {
    alert("Student name is required to print the certificate.");
    return;
  }

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const newWindow = window.open("", "_blank");
  if (!newWindow) {
    alert("Popup blocked! Please allow popups for this site.");
    return;
  }

  newWindow.document.write(`
    <html>
      <head>
        <title>Certificate - ${studentName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: ${isDarkMode ? "#1a202c" : "#ffffff"};
            color: ${isDarkMode ? "#ffffff" : "#000000"};
          }
          .certificate {
            border: 4px solid ${isDarkMode ? "#d4af37" : "#ffd700"};
            padding: 30px;
            width: 700px;
            margin: auto;
            background-color: ${isDarkMode ? "#2d3748" : "#ffffff"};
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: ${isDarkMode ? "#63b3ed" : "#1e40af"};
          }
          .divider {
            height: 2px;
            background-color: ${isDarkMode ? "#ffffff" : "#000000"};
            width: 80%;
            margin: 20px auto;
          }
          .seal {
            border: 2px solid ${isDarkMode ? "#d4af37" : "#ffd700"};
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: ${isDarkMode ? "#d4af37" : "#ffbf00"};
            margin: auto;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1 class="title">🎓 Certificate of Completion</h1>
          <p>This is proudly presented to</p>
          <h2 style="font-size: 24px; font-weight: bold;">${studentName}</h2>
          <p>for successfully completing the test.</p>
          <div class="divider"></div>
          <p><strong>Awarded on:</strong> ${new Date().toLocaleDateString()}</p>
          <div class="divider"></div>
          <div style="display: flex; justify-content: space-between; padding: 20px;">
            <div style="text-align: left;">
              <p style="font-weight: bold;">Instructor</p>
              <div style="border-top: 2px solid gray; width: 150px; margin-top: 10px;"></div>
              <p>Prepify Team</p>
            </div>
            <div class="seal">🏅</div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 1000);
          }
        </script>
      </body>
    </html>
  `);
  newWindow.document.close();
};

const Certificate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentName = queryParams.get("name") || "Student";

  return (
    <div style={styles.container}>
      <div style={styles.certificateBox}>
        <h1 style={styles.title}>Certificate of Completion</h1>
        <p style={styles.subtitle}>This is proudly presented to</p>
        <h2 style={styles.studentName}>{studentName}</h2>
        <p style={styles.subtitle}>for successfully completing the test.</p>

        <div style={styles.divider}></div>
        <p style={styles.date}>Awarded on {new Date().toLocaleDateString()}</p>

        <div style={styles.signatureSection}>
          <div style={styles.instructor}>
            <p style={styles.boldText}>Instructor</p>
            <div style={styles.signatureLine}></div>
            <p style={styles.grayText}>EduWeb Team</p>
          </div>
          <div style={styles.sealContainer}>
            <p style={styles.boldText}>Authorized Seal</p>
            <div style={styles.seal}>🏅</div>
          </div>
        </div>
      </div>

      <button onClick={printCertificate} style={styles.printButton}>
        Print Certificate
      </button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  certificateBox: {
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    border: "4px solid #FFD700",
    padding: "40px",
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1E40AF",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#555",
  },
  studentName: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#222",
    marginTop: "5px",
  },
  divider: {
    height: "2px",
    backgroundColor: "#ccc",
    width: "80%",
    margin: "20px auto",
  },
  date: {
    color: "#777",
    fontStyle: "italic",
  },
  signatureSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  instructor: {
    textAlign: "left",
  },
  sealContainer: {
    textAlign: "right",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  grayText: {
    color: "#666",
  },
  signatureLine: {
    height: "2px",
    backgroundColor: "#aaa",
    width: "150px",
    marginTop: "10px",
  },
  seal: {
    border: "2px solid #FFD700",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FFBF00",
    marginTop: "10px",
  },
  printButton: {
    marginTop: "20px",
    backgroundColor: "#1E40AF",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    transition: "background 0.3s",
  },
};

export default Certificate;
