const express = require("express");
const { scrapeTheFreight } = require("../controllers/scraper-controller");

const router = express.Router();

router.get("/scrape-freight", scrapeTheFreight);

module.exports = router;
