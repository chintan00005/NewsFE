import React, { useEffect, useState, useContext } from "react";
import NewsList from "./components/NewsList";
import RetryModal from "./components/RetryModal";
import BreakingNewsBanner from "./components/BreakingNewsBanner";
import { fetchNews } from "./api";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";

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
      <SEO 
        title="Quick News Hub - Latest Headlines" 
        description="Catch up with breaking news and headlines from trusted sources in real time." 
        url="https://quicknewshub.netlify.app/"
      />

      <BreakingNewsBanner headlines={news} />

      {!news.length && !showRetry && (
        <div className="card">
          <h2>Welcome to Quick News Hub</h2>
          <p>Stay informed with the latest headlines. News will appear shortly.</p>
        </div>
      )}

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
