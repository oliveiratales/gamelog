const express = require("express");
const setupDatabase = require("./config/setup");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const authenticateToken = require("./middlewares/authenticateToken");
require("dotenv").config();

const app = express();
app.use(express.json());

// Documentação Swagger
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Middleware global para proteger rotas, exceto login e register
app.use((req, res, next) => {
  const publicPaths = ["/api/users/login", "/api/users/register"];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  return authenticateToken(req, res, next);
});

// Rotas
const routes = require("./routes");
app.use("/api", routes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

setupDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `🚀 Para acessar a documentação em: http://localhost:${PORT}/api-docs/`
      );
    }
  });
});
