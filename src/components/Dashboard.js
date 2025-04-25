import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/news", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(res.data);
      } catch (err) {
        alert("Error fetching news");
      }
    };
    fetchNews();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>📰 Latest News</h2>
      <div style={styles.grid}>
        {articles.map((article, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.title}>{article.title}</h3>
            <p style={styles.desc}>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.link}>Read more</a>
            <button
              onClick={() =>
                navigator.share
                  ? navigator.share({ title: article.title, url: article.url })
                  : alert("Share not supported on this browser")
              }
              style={styles.shareBtn}
            >
              Share
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "20px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#111",
  },
  desc: {
    color: "#444",
    fontSize: "15px",
    marginBottom: "10px",
  },
  link: {
    color: "#007bff",
    marginBottom: "10px",
    textDecoration: "none",
  },
  shareBtn: {
    alignSelf: "flex-start",
    padding: "8px 12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Dashboard;
