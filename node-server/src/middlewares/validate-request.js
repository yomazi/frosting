const createError = require("http-errors");

const validate = (schemas) => (req, res, next) => {
  try {
    Object.entries(schemas).forEach(([key, schema]) => {
      if (schema) {
        const { error } = schema.validate(req[key], { abortEarly: false });

        if (error) {
          const message = error.details.map((detail) => detail.message).join(", ");

          throw new createError.BadRequest(message);
        }
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validate };
