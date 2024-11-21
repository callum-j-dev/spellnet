const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Deck = require('../models/Deck');
const GameRecord = require('../models/GameRecord');
const decksController = require('../controllers/decks');

// @desc    Show add page
// @route   GET /decks/add
router.get('/add', ensureAuth, decksController.getAddPage);

// @desc    Process add form
// @route   POST /decks
router.post('/', ensureAuth, decksController.createDeck);

// @desc    Show all decks
// @route   GET /decks/index
router.get('/', ensureAuth, decksController.getDecks);

// @desc    Show single deck
// @route   GET /decks/:id
router.get('/:id', ensureAuth, decksController.getDeck);

// @desc    Show edit page
// @route   GET /decks/edit/":id"
router.get('/edit/:id', ensureAuth, decksController.getEditPage);

// @desc    Update deck
// @route   PUT /decks/:id
router.put('/:id', ensureAuth, decksController.updateDeck);

// @desc    Delete deck
// @route   DELETE /decks/:id
router.delete('/:id', ensureAuth, decksController.deleteDeck);

// @desc    Show User decks
// @route   GET /decks/user/:userId
router.get('/user/:userId', ensureAuth, decksController.getUserDecks);

module.exports = router;