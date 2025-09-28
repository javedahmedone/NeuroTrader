import { useState, useEffect } from "react";
import "../Styles/Spinner.css"; // ✅ Import CSS

export default function Spinner() {
  const messages = [
    "Integrating with broker",
    "Integration successful",
    "Getting info from your broker",
    "Info fetched successfully ",
    "Analyzing portfolio",
    "analyzed successfully"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{messages[currentIndex]}...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  spinner: {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite", // ✅ Works because CSS has @keyframes now
    marginBottom: "15px",
    
  },
  text: {
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
};
