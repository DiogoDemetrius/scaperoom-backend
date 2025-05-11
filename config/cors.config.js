const cors = require('cors');

const corsOptions = {
  origin: 'https://scaperoom-fis-homologacao.vercel.app', // ou o domínio do seu front-end em produção
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

module.exports = cors(corsOptions);
