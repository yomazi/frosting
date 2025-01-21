const Joi = require("joi");
const authHeaderSchema = require("./auth-header-schema");

class AuthSchemas {
  static verify = {
    headers: authHeaderSchema,
  };
}

module.exports = AuthSchemas;
