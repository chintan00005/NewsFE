import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import LoginModal from "./components/LoginModal";
import RetryModal from "./components/RetryModal";
import { fetchNews } from "./api";
import { logout } from "./auth";
import SEO from "./SEO";
import { HelmetProvider } from "react-helmet-async";
import BreakingNewsBanner from "./components/BreakingNewsBanner"; // 👈 import it

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
    <HelmetProvider>
      <SEO 
        title="Latest News - Quick News Hub"
        description="Explore the latest trending news from around the world."
        url="https://quicknewshub.netlify.app"
      />

      {/* 🔴 Breaking news banner */}
      <BreakingNewsBanner headlines={news} />

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
    </HelmetProvider>
  );
}

export default App;
