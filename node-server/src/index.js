const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();
const authRoutes = require("./routes/auth-routes.js");
const environmentRoutes = require("./routes/environment-routes");
const scraperRoutes = require("./routes/scraper-routes");
const performanceRoutes = require("./routes/performance-routes");

// Serve static files from the React app (after building it)
app.use(express.static(path.join(__dirname, "../../web-client/dist")));

// middleware to parse JSON request bodies
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", environmentRoutes);
app.use("/api", performanceRoutes);
app.use("/api", scraperRoutes);

// "Catch-all" route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frosting-client/build/index.html"));
});

// Load SSL credentials
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "../../https/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "../../https/server.cert")),
};

// Start HTTPS server
https.createServer(httpsOptions, app).listen(443, () => {
  console.log("HTTPS server running on port 443");
});
