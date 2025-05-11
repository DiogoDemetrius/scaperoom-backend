const Progress = require('../models/Progress');

const getProgress = async (userId) => {
  const progress = await Progress.findOne({ userId });
  if (!progress) throw new Error('Progresso não encontrado');
  return progress;
};

const updateProgress = async (userId, updates) => {
  const progress = await Progress.findOneAndUpdate({ userId }, updates, { new: true });
  if (!progress) throw new Error('Progresso não encontrado');
  return progress;
};

module.exports = { getProgress, updateProgress };
