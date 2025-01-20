const { errorHandler } = require("./middlewares/error-handler");
const express = require("express");
const app = express();

const https = require("https");
const path = require("path");

const ConfigService = require("./services/config-service");

ConfigService.initialize(app);

const configRoutes = require("./routes/config-routes");
const authRoutes = require("./routes/auth-routes");
const usersRoutes = require("./routes/users-routes.js");
const scraperRoutes = require("./routes/scraper-routes");
//const performanceRoutes = require("./routes/performance-routes");

// Serve static files from the React app (after building it)
app.use(express.static(path.join(__dirname, "../../web-client/dist")));

const version = "v1";
const routePrefix = `/api/${version}`;

// middleware to parse JSON request bodies
app.use(express.json());

app.use(routePrefix, configRoutes);
app.use(routePrefix, authRoutes);
app.use(routePrefix, usersRoutes);

// app.use(routePrefix, performanceRoutes);
app.use(routePrefix, scraperRoutes);
app.use(errorHandler);

// "Catch-all" route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../web-client/build/index.html"));
});

// Load SSL credentials
const httpsOptions = ConfigService.getHttpsOptions();
const httpPort = ConfigService.getHttpPort();

https.createServer(httpsOptions, app).listen(httpPort, () => {
  console.log(`\nFrosting server listening on port ${httpPort}...`);
});
