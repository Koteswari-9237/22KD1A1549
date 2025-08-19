import React, { useState } from "react";
import { log } from "../utils/loggingMiddleware";

export default function UrlForm({ addUrl }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validity, setValidity] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.startsWith("http")) {
      log("frontend", "error", "component", "Invalid URL input");
      alert("Invalid URL. Must start with http or https.");
      return;
    }

    addUrl({ originalUrl: url, shortcode: customCode, validity });
    log("frontend", "info", "component", `URL shortened: ${url}`);
    setUrl("");
    setCustomCode("");
    setValidity(30);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />
      <input
        type="number"
        placeholder="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <button type="submit">Shorten URL</button>
    </form>
  );
}
