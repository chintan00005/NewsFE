import { useState, useEffect } from "react";
import { getNews } from "./services/NewsService";
import BreakingNewsBanner from "./components/BreakingNewsBanner";
import SEO from "./SEO";
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

const PublicPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadNews = async () => {
    try {
      setLoading(true);
      setHasError(false);
      const data = await getNews();
      setNews(data);
    } catch (err) {
      setHasError(true);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <>
      <SEO
        title="Quick News Hub - Real-Time Headlines"
        description="Stay updated with real-time global news on politics, tech, business, and more at Quick News Hub."
        url="https://quicknewshub.netlify.app/"
      />

      <BreakingNewsBanner headlines={news} />

      <div className="p-5">
        {loading ? (
          <div className="card">
            <h2>Warming up servers...</h2>
            <p>Our backend may take a few seconds to respond if idle. Thanks for your patience.</p>
          </div>
        ) : hasError ? (
          <div className="card">
            <h2>Failed to load news</h2>
            <p>There was an issue loading the news. Please try again later.</p>
          </div>
        ) : news.length === 0 ? (
          <div className="card">
            <h2>No news available</h2>
            <p>Check back soon for the latest updates.</p>
          </div>
        ) : (
          <div className="news-list">
            {news.map((item, idx) => (
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

export default PublicPage;
