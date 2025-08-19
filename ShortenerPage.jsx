import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";

export default function ShortenerPage() {
  const [urls, setUrls] = useState([]);

  const addUrl = ({ originalUrl, shortcode, validity }) => {
    const expiry = new Date(Date.now() + validity * 60000);  
    setUrls((prev) => [...prev, { originalUrl, shortcode, expiry }]);
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <UrlForm addUrl={addUrl} />
      <UrlList urls={urls} />
    </div>
  );
}
