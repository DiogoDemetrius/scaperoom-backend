const Progress = require('../models/Progress');
const User = require('../models/User');

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

const getRanking = async () => {
  // Busca todos os progressos e faz join com a tabela de usuários para pegar o nome do grupo
  const ranking = await Progress.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        group: '$user.group',
        score: 1,
        _id: 0
      }
    },
    { $sort: { score: -1 } }
  ]);

  return ranking;
};

module.exports = { getProgress, updateProgress, getRanking };
