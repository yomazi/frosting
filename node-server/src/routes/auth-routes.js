const express = require("express");
const { authenticate, register } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/authenticate", authenticate);
router.post("/register", register);

module.exports = router;
