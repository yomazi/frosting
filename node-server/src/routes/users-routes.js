const Schemas = require("../schemas/users-schemas");
const Controller = require("../controllers/users-controller");

const express = require("express");
const router = express.Router();

const { validate } = require("../middlewares/validate-request");

router.post("/users", validate(Schemas.register), Controller.register);

module.exports = router;
