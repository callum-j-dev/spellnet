const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const GameRecord = require('../models/GameRecord');
const Deck = require('../models/Deck');

const gameRecordsController = require('../controllers/game_records');

// @desc    Show add page
// @route   GET /game_records/add
router.get('/add', ensureAuth, gameRecordsController.getAddPage);

// @desc Add game record
// @route POST /game_records
router.post('/', ensureAuth, gameRecordsController.addGameRecord);

module.exports = router;