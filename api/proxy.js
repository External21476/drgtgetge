// api/proxy.js
export default async function handler(req, res) {
  const url = req.query.url;

  // Basic validation: avoid internal IPs, localhost, etc.
  if (!url || !/^https?:\/\//i.test(url)) {
    return res.status(400).send("Invalid or missing ?url=");
  }
  if (/localhost|127\.0\.0\.1|0\.0\.0\.0|internal|metadata/.test(url)) {
    return res.status(403).send("Blocked target host.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MiniProxyBrowser/1.0"
      }
    });

    const contentType = response.headers.get("content-type") || "text/plain";
    res.setHeader("content-type", contentType);

    const body = await response.text();
    res.send(body);
  } catch (err) {
    res.status(500).send("Error fetching URL: " + err.message);
  }
}
