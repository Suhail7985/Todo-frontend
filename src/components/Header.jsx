import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Todo App</h1>
      </div>
      {isLoggedIn && (
        <nav className="nav-links">
          
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
    </header>
  );
}