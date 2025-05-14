import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getToken } from "../auth";

const Header = ({ onLoginClick, onLogout }) => {
  const isLoggedIn = !!getToken();
  const location = useLocation();

  return (
  <header className="header">
  <div className="logo">
    <Link to="/" className="logo-text">📰 NewsExpress</Link>
  </div>

  <div className="header-right">
    <nav className="nav-links">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
      <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
      <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
      <Link to="/privacy-policy" className={location.pathname === "/privacy-policy" ? "active" : ""}>Privacy</Link>
    </nav>
    <div className="auth-button">
      {isLoggedIn ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLoginClick}>Login</button>
      )}
    </div>
  </div>
</header>
  );
};

export default Header;
