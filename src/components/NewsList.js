import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const NewsList = ({ news }) => {
  return (
    <div className="news-list">
      {news.map((article, index) => (
        <div key={index} className="card">
          {article.urlToImage && (
            <LazyLoadImage
              src={article.urlToImage}
              alt={article.title}
              effect="blur"
              width="100%"
              height="200px"
              style={{ objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
            />
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
