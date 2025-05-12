import React, { useEffect, useState, useContext } from "react";
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import LoginModal from "./components/LoginModal";
import RetryModal from "./components/RetryModal";
import BreakingNewsBanner from "./components/BreakingNewsBanner";
import { fetchNews } from "./api";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const PublicPage = () => {
  const [news, setNews] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const getNews = async () => {
    try {
      const data = await fetchNews();
      setNews(data);
    } catch {
      setShowRetry(true);
    }
  };

  useEffect(() => {
  if (token) {
    navigate("/dashboard");
  } else {
    getNews();
  }
}, [token, navigate]);

  return (
    <>
      <BreakingNewsBanner headlines={news} />

      <Header
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => {
          logout();
           navigate("/");
        }}
      />

      <NewsList news={news} />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() =>  navigate("/dashboard")}
        />
      )}

      {showRetry && (
        <RetryModal
          onRetry={() => {
            setShowRetry(false);
            getNews();
          }}
          onCancel={() => setShowRetry(false)}
        />
      )}
    </>
  );
};

export default PublicPage;
