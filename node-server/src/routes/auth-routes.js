const Schemas = require("../schemas/auth-schemas");
const Controller = require("../controllers/auth-controller");

const express = require("express");
const router = express.Router();

const { validate } = require("../middlewares/validate-request");

router.post("/auth/verify", validate(Schemas.verify), Controller.verify);

module.exports = router;
