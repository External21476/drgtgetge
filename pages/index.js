import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");

  async function loadPage(e) {
    e.preventDefault();
    const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
    const text = await res.text();
    setHtml(text);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Proxy Browser</h1>
      <form onSubmit={loadPage}>
        <input
          style={{ width: "70%" }}
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Load</button>
      </form>

      <hr />

      <iframe
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
        srcDoc={html}
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
