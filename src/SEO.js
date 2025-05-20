import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Quick News Hub',
  description = 'Get real-time global news updates on politics, business, technology, and more.',
  keywords = 'news, live news, world headlines, politics, business, tech news, breaking news',
  image = 'https://quicknewshub.netlify.app/thumbnail.png',
  url = 'https://quicknewshub.netlify.app'
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Quick News Hub" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Quick News Hub" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Google Site Verification */}
      <meta name="google-site-verification" content="T8d3ema8J-fAYlXbg3tqG4wryGvRqwcVtdWCLmqWuwc" />
    </Helmet>
  );
};

export default SEO;
