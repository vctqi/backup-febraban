const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Modelo para armazenar informações das empresas consultadas
const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  razao_social: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  situacao_cadastral: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_abertura: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  cnae_codigo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cnae_descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  porte: {
    type: DataTypes.STRING,
    allowNull: true
  },
  endereco_completo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'empresas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Empresa;