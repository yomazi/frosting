const express = require("express");
const { getAllPerformances } = require("../controllers/performance-controller");

const router = express.Router();

router.get("/performances", getAllPerformances);

module.exports = router;
