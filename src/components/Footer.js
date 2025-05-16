import React from "react";
import "../index.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>&copy; {new Date().getFullYear()} Quick News Hub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
