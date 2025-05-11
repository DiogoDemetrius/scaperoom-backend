const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentQuestion: { type: Number, default: 0 },
  lives: { type: Number, default: 3 },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Progress', ProgressSchema);
