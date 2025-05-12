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

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Exporta o app para o Vercel
module.exports = app;