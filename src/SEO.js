// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  return (
    <Helmet>
      <title>{title || 'Quick News Hub'}</title>
      <meta name="description" content={description || 'Get real-time global news updates.'} />
      <meta name="keywords" content={keywords || 'news, live news, headlines, world news'} />
      <meta name="author" content="Quick News Hub" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={title || 'Quick News Hub'} />
      <meta property="og:description" content={description || 'Get real-time global news updates.'} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://quicknewshub.netlify.app'} />
      <meta property="og:image" content={image || 'https://quicknewshub.netlify.app/thumbnail.png'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || 'Quick News Hub'} />
      <meta name="twitter:description" content={description || 'Get real-time global news updates.'} />
      <meta name="twitter:image" content={image || 'https://quicknewshub.netlify.app/thumbnail.png'} />
      <meta name="google-site-verification" content="426bffe95d59281f" />
    </Helmet>
  );
};

export default SEO;
