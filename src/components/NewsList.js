import React from "react";

const NewsList = ({ news }) => {
  return (
    <div className="news-list">
      {news.map((article, index) => (
        <div key={index} className="card">
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            <button>Read More</button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
