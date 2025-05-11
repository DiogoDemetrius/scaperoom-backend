require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const corsMiddleware = require('./config/cors.config');

const authRoutes = require('./routes/auth.routes');
const gameRoutes = require('./routes/game.routes');

const app = express();
connectDB();

app.use(corsMiddleware);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
