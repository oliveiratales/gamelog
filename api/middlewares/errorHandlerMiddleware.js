const LogService = require("../services/logService");

async function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Erro interno no servidor";

  await LogService.error({
    message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
