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

module.exports = { getProgress, updateProgress };
