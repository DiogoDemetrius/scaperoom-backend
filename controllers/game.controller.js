const gameService = require('../services/game.service');

const getProgress = async (req, res) => {
  try {
    const progress = await gameService.getProgress(req.user.id);
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const updates = req.body;
    const progress = await gameService.updateProgress(req.user.id, updates);
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRanking = async (req, res) => {
  try {
    const ranking = await gameService.getRanking();
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar ranking' });
  }
};

module.exports = { getProgress, updateProgress, getRanking };
