const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Modelo para armazenar informações de consultas
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
    type: DataTypes.STRING
  },
  user_agent: {
    type: DataTypes.STRING
  }
});

// Modelo para armazenar informações das empresas consultadas
const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cnpj: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  razao_social: {
    type: DataTypes.STRING
  },
  nome_fantasia: {
    type: DataTypes.STRING
  },
  situacao_cadastral: {
    type: DataTypes.STRING
  },
  data_abertura: {
    type: DataTypes.DATEONLY
  },
  cnae_codigo: {
    type: DataTypes.STRING
  },
  cnae_descricao: {
    type: DataTypes.STRING
  },
  porte: {
    type: DataTypes.STRING
  },
  endereco_completo: {
    type: DataTypes.STRING
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Modelo para armazenar resultados de análises
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
});

// Definir relacionamentos
Consulta.hasOne(Analise, { foreignKey: 'consulta_id' });
Analise.belongsTo(Consulta, { foreignKey: 'consulta_id' });

// Sincronizar modelos com o banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
};

module.exports = {
  Consulta,
  Empresa,
  Analise,
  syncDatabase
};