import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import LoginModal from "./components/LoginModal";
import RetryModal from "./components/RetryModal";
import { fetchNews } from "./api";
import { logout } from "./auth";

function App() {
  const [news, setNews] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRetry, setShowRetry] = useState(false);

  const getNews = async () => {
    try {
      const data = await fetchNews();
      setNews(data);
    } catch {
      setShowRetry(true);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => {
          logout();
          window.location.reload();
        }}
      />

      <NewsList news={news} />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            setShowLogin(false);
            window.location.reload();
          }}
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
}

export default App;
