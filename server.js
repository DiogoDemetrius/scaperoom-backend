require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const { cors: corsMiddleware, handleOptions } = require('./config/cors.config');

const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();
connectDB();

// Aplicando os middlewares CORS
app.use(corsMiddleware);
app.use(handleOptions);

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Rota de teste para verificar se a API está funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API está funcionando!' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exporta o app para o Vercel
module.exports = app;