import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const getNews = async () => {
    const endpoint = token ? "/api/news/personalized" : "/api/news";
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();

      if (res.ok) {
        setArticles(data.articles);
        setError(null);
      } else {
        throw new Error(data.message || "Failed to load news");
      }
    } catch (err) {
      console.error("News fetch error:", err.message);
      setError("Unable to load news. Please try again later.");
    }
  };

  useEffect(() => {
    getNews();
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setShowLogin(false);
        getNews();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    getNews();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">📰 DailyDigest</h1>
        {token ? (
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </header>

      {/* News List */}
      <main className="p-6 max-w-4xl mx-auto">
        {articles.length > 0 ? (
          articles.map((a, i) => (
            <div
              key={i}
              className="mb-6 bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{a.description}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </a>
                <button
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  onClick={() => navigator.share && navigator.share({
                    title: a.title,
                    text: a.description,
                    url: a.url
                  })}
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No news available.</p>
        )}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4 rounded"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className="w-full mt-2 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              {error}
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={getNews}
              >
                Retry
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setError(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
