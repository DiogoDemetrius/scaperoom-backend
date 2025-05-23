const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/progress', authenticate, gameController.getProgress);
router.put('/progress', authenticate, gameController.updateProgress);
router.get('/ranking', authenticate, gameController.getRanking);

module.exports = router;
