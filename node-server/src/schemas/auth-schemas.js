const Joi = require("joi");

class AuthSchemas {
  static verify = {
    body: Joi.object({
      token: Joi.string().required(),
    }),
  };
}

module.exports = AuthSchemas;
