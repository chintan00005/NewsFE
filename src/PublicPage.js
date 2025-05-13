import React, { useEffect, useState, useContext } from "react";
import NewsList from "./components/NewsList";
import RetryModal from "./components/RetryModal";
import BreakingNewsBanner from "./components/BreakingNewsBanner";
import { fetchNews } from "./api";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const PublicPage = () => {
  const [news, setNews] = useState([]);
  const [showRetry, setShowRetry] = useState(false);
  const { token } = useContext(AuthContext);
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

      <NewsList news={news} />

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
