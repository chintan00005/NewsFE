import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getNews } from "../services/NewsService";
import Login from "./Login";
import NewsModal from "./NewsModal";
import { Helmet } from 'react-helmet-async';
import { Helmet, HelmetProvider } from "react-helmet-async";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);

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

  return (
        <HelmetProvider>
          <Helmet>
          <title>Dashboard - Daily News</title>
          <meta name="description" content="Your personal dashboard to manage news preferences and bookmarks." />
          </Helmet>
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

      {error ? (
        <NewsModal message="Failed to load news" onRetry={loadNews} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.map((item, idx) => (
            <div key={idx} className="border p-4 rounded shadow hover:shadow-lg">
              <h2 className="font-semibold mb-2">{item.title}</h2>
              <p className="text-sm mb-2">{item.description}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
    </HelmetProvider>
  );
};

export default Dashboard;
