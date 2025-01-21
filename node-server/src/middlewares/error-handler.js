const ConfigService = require("../services/config-service");

const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;
  const errorCode = error.code || error.name || "InternalServerError";
  const message = error.message || "An unexpected error occurred.";

  if (ConfigService.environmentId === "local") {
    console.error(error.stack);
    console.log("");
  }

  res.status(statusCode).json({
    errorCode,
    message,
  });
};

module.exports = { errorHandler };
