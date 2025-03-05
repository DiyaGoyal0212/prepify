import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#008080", color: "white", padding: "50px 0", textAlign: "center" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* 🔹 Title & Description */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>Prepify</h2>
          <p style={{ fontSize: "16px", color: "#e0f2f1" }}>
            Your one-stop course for everything you need. Reliable, fast, and global!
          </p>
        </div>

        {/* 🔹 Social Icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", color: "white", textDecoration: "none" }}>
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", color: "white", textDecoration: "none" }}>
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", color: "white", textDecoration: "none" }}>
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "24px", color: "white", textDecoration: "none" }}>
            <FaLinkedinIn />
          </a>
        </div>

        {/* 🔹 Copyright */}
        <div style={{ fontSize: "14px", color: "#e0f2f1" }}>
          <p>&copy; {new Date().getFullYear()} Prepify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
