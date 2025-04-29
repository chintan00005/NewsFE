import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import LoginModal from "./components/LoginModal";
import RetryModal from "./components/RetryModal";
import { fetchNews } from "./api";
import { logout } from "./auth";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
      <Helmet>
        <title>Daily News - Your trusted news source</title>
        <meta
          name="description"
          content="Get top daily news from around the world. Reliable and up-to-date headlines for you."
        />
        <meta name="keywords" content="news, daily news, headlines, India news, world news" />
        <meta name="author" content="News App" />
      </Helmet>
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
