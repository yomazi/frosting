const Joi = require("joi");
const authHeaderSchema = require("./auth-header-schema");

class DeveloperSchemas {
  static login = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  };

  static logout = {
    headers: authHeaderSchema,
  };
}

module.exports = DeveloperSchemas;
