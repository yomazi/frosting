const ConfigController = require("../controllers/config-controller");

const express = require("express");
const router = express.Router();

router.get("/config", ConfigController.getEnvironmentVariables);

module.exports = router;
