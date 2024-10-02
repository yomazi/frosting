const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();

// Serve static files from the React app (after building it)
app.use(express.static(path.join(__dirname, "../frosting-client/dist")));

// Example API route
app.get("/api/shows", (req, res) => {
  res.json([
    { id: 1, name: "Concert 1", date: "2024-10-01" },
    { id: 2, name: "Concert 2", date: "2024-10-02" },
  ]);
});

// Simple API route for greeting
app.get("/api/greet", (req, res) => {
  res.json({ message: "Hello from Express, sucka!" });
});

// "Catch-all" route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frosting-client/build/index.html"));
});

// Load SSL credentials
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "../https/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "../https/server.cert")),
};

// Start HTTPS server
https.createServer(httpsOptions, app).listen(443, () => {
  console.log("HTTPS server running on port 443");
});
