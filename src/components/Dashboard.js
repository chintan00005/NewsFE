import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getNews } from "../services/NewsService";
import Login from "./Login";
import NewsModal from "./NewsModal";
import BreakingNewsBanner from "./BreakingNewsBanner";
import SEO from "../SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Utility for showing "x hours ago"
const timeAgo = (date) => {
  const now = new Date();
  const published = new Date(date);
  const diff = Math.floor((now - published) / 1000); // in seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return published.toLocaleDateString();
};

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState(""); 

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
  }, [token]);

  const filteredNews = filter
    ? news.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.description?.toLowerCase().includes(filter.toLowerCase())
      )
    : news;

  return (
    <>
      <SEO 
        title="Latest News - Quick News Hub"
        description="Explore the latest trending news from around the world."
        url="https://quicknewshub.netlify.app"
      />

      <BreakingNewsBanner headlines={news} />

      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📰 News Portal</h1>
          {token ? (
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          ) : (
            <Login />
          )}
        </div>

        {/* Keyword Filter */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by keyword (e.g., tech, sports)..."
            className="w-full md:w-1/3 p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {error ? (
          <NewsModal message="Failed to load news" onRetry={loadNews} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredNews.map((item, idx) => (
              <div key={idx} className="border p-4 rounded shadow hover:shadow-lg bg-white">
                {item.urlToImage && (
                  <LazyLoadImage
                    src={item.urlToImage}
                    alt={item.title}
                    effect="blur"
                    className="w-full h-[200px] object-cover mb-3 rounded"
                  />
                )}
                <h2 className="font-semibold mb-2">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-1 italic">{timeAgo(item.publishedAt)}</p>
                <p className="text-sm mb-2">{item.description}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Read more
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
