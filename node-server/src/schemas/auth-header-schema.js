const Joi = require("joi");

const authHeaderSchema = Joi.object({
  authorization: Joi.string()
    .pattern(/^Bearer\s[a-zA-Z0-9\-_.]+$/)
    .messages({
      "string.pattern.base": "Authorization header must be in the format: Bearer <token>",
      "any.required": "Authorization header is required",
    }),
}).unknown(true);

module.exports = authHeaderSchema;
