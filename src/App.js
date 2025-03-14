import React, { useState } from "react";
import logo from "./assets/logo.png";
import styles from './App.module.css';
import Card from "./Card";
import Img1 from "./assets/research1.png";
import Img2 from "./assets/research2.png";
import Img3 from "./assets/research3.png";
import Img4 from "./assets/research4.png";
import Img5 from "./assets/research5.png";
import Img6 from "./assets/research6.png";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setEmail(e.target.value);
    setError(""); // Clear error when user types
    setSuccessMessage("");
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError("Email is required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://3.228.97.110:9000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setSuccessMessage("Form Submitted");
        setEmail(""); // Clear input field
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img src={logo} alt="logo" />
        <p style={{ fontSize: "20px" }}>Suite Of Business Support Services</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={handleChange}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "3px" }}
            />
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            {successMessage && <p style={{ color: "green", fontSize: "14px" }}>{successMessage}</p>}
            <button
              type="submit"
              style={{
                border: "1px solid #EA7B2C",
                backgroundColor: "#EA7B2C",
                borderRadius: "3px",
                padding: "8px",
                color: "white",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Contact Me"}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.cardsContainer}>
        <Card img={Img1} text={"Presentation Design"} />
        <Card img={Img2} text={"Audio - Visual Production"} />
        <Card img={Img3} text={"Translation Services"} />
        <Card img={Img4} text={"Graphic Design"} />
        <Card img={Img5} text={"Research & Analytics"} />
        <Card img={Img6} text={"Data Processing"} />
      </div>
    </div>
  );
}

export default App;

