const express = require("express");
const app = express();
const PORT = 8000;

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  setInterval(() => {
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval();
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server is running at http://localhost:${PORT}`);
});
