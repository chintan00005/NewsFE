import { useState, useEffect } from "react";
import { getNews } from "../services/NewsService";
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
  const [news, setNews] = useState([]);

  const loadNews = async () => {
    try {
      const data = await getNews(); // no token
      setNews(data);
    } catch {
      setNews([]);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <>
      <SEO
        title="Latest News - Quick News Hub"
        description="Catch up on the latest global news updates, technology, and headlines."
        url="https://quicknewshub.netlify.app/dashboard"
      />

      <BreakingNewsBanner headlines={news} />

      <div className="p-5">
        {news.length === 0 ? (
          <div className="card">
            <h2>No news available right now</h2>
            <p>Please check back later for the latest updates.</p>
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

export default Dashboard;
