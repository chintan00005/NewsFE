import React from "react";
import { getToken, logout } from "../auth";

const Header = ({ onLoginClick, onLogout }) => {
  const isLoggedIn = !!getToken();

  return (
    <header>
      <div>📰 NewsExpress</div>
      {isLoggedIn ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button onClick={onLoginClick}>Login</button>
      )}
    </header>
  );
};

export default Header;
