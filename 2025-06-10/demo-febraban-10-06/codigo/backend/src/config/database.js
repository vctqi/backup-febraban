const { Sequelize } = require('sequelize');
const path = require('path');
const logger = require('./logger');

// Configura a conexão com o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: msg => logger.debug(msg)
});

// Função para inicializar o banco de dados
const initializeDatabase = async () => {
  try {
    // Testa a conexão
    await sequelize.authenticate();
    logger.info('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync();
    logger.info('Modelos sincronizados com o banco de dados.');
    
    return true;
  } catch (error) {
    logger.error(`Erro ao conectar com o banco de dados: ${error.message}`);
    throw error;
  }
};

module.exports = {
  sequelize,
  initializeDatabase
};