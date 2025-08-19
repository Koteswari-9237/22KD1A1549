import React from "react";

export default function UrlList({ urls }) {
  return (
    <div>
      <h3>Shortened URLs</h3>
      <ul>
        {urls.map((u, idx) => (
          <li key={idx}>
            <a href={u.originalUrl} target="_blank" rel="noopener noreferrer">
              {u.shortcode || "generated-code"}
            </a>{" "}
            - Expires at: {new Date(u.expiry).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
