const Schemas = require("../schemas/developer-schemas");
const Controller = require("../controllers/developer-controller");

const express = require("express");
const router = express.Router();

const { validate } = require("../middlewares/validate-request");

router.post("/developer/login", validate(Schemas.login), Controller.login);
router.post("/developer/logout", validate(Schemas.logout), Controller.logout);

module.exports = router;
