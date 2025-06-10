const app = require('./config/server');
const { syncDatabase } = require('./models');

// Sincronizar modelos com o banco de dados
syncDatabase();

// Definir porta
const PORT = process.env.PORT || 3002;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});