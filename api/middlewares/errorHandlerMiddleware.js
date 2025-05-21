function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Erro interno no servidor";

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
