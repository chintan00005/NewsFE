import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getNews } from "../services/NewsService";
import NewsModal from "./NewsModal";
import BreakingNewsBanner from "./BreakingNewsBanner";
import SEO from "../SEO";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const timeAgo = (date) => {
  const now = new Date();
  const published = new Date(date);
  const diff = Math.floor((now - published) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return published.toLocaleDateString();
};

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
 const filter = "";

  const loadNews = async () => {
    try {
      const data = await getNews(token);
      if (data.length === 0) setError(true);
      else {
        setNews(data);
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  };


  useEffect(() => {
    loadNews();
    // eslint-disable-next-line
}, []);

  const filteredNews = filter
    ? news.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.description?.toLowerCase().includes(filter.toLowerCase())
      )
    : news;

  return (
    <>
      <SEO 
        title="Dashboard - Quick News Hub"
        description="Private dashboard for latest news."
        url="https://quicknewshub.netlify.app/dashboard"
      />

      <BreakingNewsBanner headlines={news} />

      <div className="p-5">
        {error ? (
          <NewsModal message="Failed to load news" onRetry={loadNews} />
        ) : (
          <div className="news-list">
            {filteredNews.map((item, idx) => (
              <div key={idx} className="card">
                {item.urlToImage && (
                  <LazyLoadImage
                    src={item.urlToImage}
                    alt={item.title}
                    effect="blur"
                    className="news-image"
                  />
                )}
                <h2>{item.title}</h2>
                <p className="timestamp">{timeAgo(item.publishedAt)}</p>
                <p>{item.description}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button>Read More</button>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
