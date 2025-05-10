import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SEO from "./SEO";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "./components/Dashboard"
import { AuthContext } from "./context/AuthContext";
import PublicPage from "./PublicPage";

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
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
