const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Modelo para armazenar informações das consultas realizadas
const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_consulta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ip_origem: {
    type: DataTypes.STRING,
    allowNull: true
  },
  user_agent: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'consultas',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Consulta;