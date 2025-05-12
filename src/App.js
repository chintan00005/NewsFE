import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./SEO";
import Dashboard from "./components/Dashboard";
import PublicPage from "./PublicPage";
import { AuthContext } from "./context/AuthContext";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Header from "./components/Header"
import Footer from "./components/Footer";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <HelmetProvider>
      <SEO
        title="Quick News Hub"
        description="Explore the latest trending news from around the world."
        url="https://quicknewshub.netlify.app"
      />

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  );
};

export default App;