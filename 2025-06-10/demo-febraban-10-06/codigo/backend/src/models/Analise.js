const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Consulta = require('./Consulta');

// Modelo para armazenar os resultados das análises
const Analise = sequelize.define('Analise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  consulta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Consulta,
      key: 'id'
    }
  },
  score_final: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  classificacao_risco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  criterios_aplicados: {
    type: DataTypes.TEXT, // JSON serializado
    allowNull: true,
    get() {
      const value = this.getDataValue('criterios_aplicados');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('criterios_aplicados', JSON.stringify(value));
    }
  },
  sinais_alerta: {
    type: DataTypes.TEXT, // JSON serializado
    allowNull: true,
    get() {
      const value = this.getDataValue('sinais_alerta');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('sinais_alerta', JSON.stringify(value));
    }
  },
  data_analise: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'analises',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Definir relacionamento
Analise.belongsTo(Consulta, { foreignKey: 'consulta_id' });
Consulta.hasOne(Analise, { foreignKey: 'consulta_id' });

module.exports = Analise;