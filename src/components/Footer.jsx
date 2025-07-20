import React from "react";
import "./Footer.css"; // Or App.css if classes are global
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
}