const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://scaperoom-fis-homologacao.vercel.app',
  'https://scaperoom-fis.vercel.app',
  'https://m-fis-homologacao.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem origin (como apps mobile ou Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware principal do CORS
const corsMiddleware = cors(corsOptions);

// Middleware para lidar com preflight requests
const handleOptions = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).json({});
  }
  next();
};

module.exports = { cors: corsMiddleware, handleOptions };