const Joi = require("joi");

class UsersSchemas {
  static register = {
    body: Joi.object({
      firstName: Joi.string()
        .regex(/^[a-zA-ZÀ-ž\s]+$/)
        .min(1)
        .required(),
      lastName: Joi.string()
        .regex(/^[a-zA-ZÀ-ž\s]+$/)
        .min(1)
        .required(),
      email: Joi.string().email().required(),
      uid: Joi.string().alphanum().min(1).required(),
    }),
  };
}

module.exports = UsersSchemas;
