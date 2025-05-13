import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./SEO";
import Dashboard from "./components/Dashboard";
import PublicPage from "./PublicPage";
import { AuthContext } from "./context/AuthContext";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal"; // make sure it's imported

const AppContent = () => {
  const { token, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => {
          logout();
          navigate("/");
        }}
      />

      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>


      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            navigate("/dashboard");
          }}
        />
      )}


      <Footer />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <SEO
      title="Quick News Hub"
      description="Explore the latest trending news from around the world."
      url="https://quicknewshub.netlify.app"
    />
    <Router>
      <AppContent />
    </Router>
  </HelmetProvider>
);

export default App;
