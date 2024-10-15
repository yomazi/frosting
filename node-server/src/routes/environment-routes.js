const express = require("express");
const { getEnvironmentInfo } = require("../controllers/environment-controller");

const router = express.Router();

router.get("/environment", getEnvironmentInfo);

module.exports = router;
