const { sequelize } = require("./db");
const fs = require("fs");
const path = require("path");

const modelsPath = path.resolve(__dirname, "../models");

const models = {};

const importModels = () => {
  fs.readdirSync(modelsPath)
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const model = require(path.join(modelsPath, file));
      models[model.name] = model;
    });
};

// Função para configurar relacionamentos entre modelos
const setupAssociations = () => {
  if (models.User && models.UserGame) {
    models.User.hasMany(models.UserGame, {
      foreignKey: "userId",
      as: "userGames",
    });
    models.UserGame.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
};

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso.");

    importModels();

    setupAssociations();

    await sequelize.sync();
    console.log("✅ Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.error(
      "❌ Erro ao conectar ou sincronizar o banco de dados:",
      error
    );
    process.exit(1);
  }
};

module.exports = { setupDatabase, models };
