const { sequelize } = require('./db');
const fs = require('fs');
const path = require('path');

const modelsPath = path.resolve(__dirname, '../models');

const importModels = () => {
  fs.readdirSync(modelsPath)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
      require(path.join(modelsPath, file));
    });
};

const setupDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    importModels();

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
    process.exit(1);
  }
};

module.exports = setupDatabase;
