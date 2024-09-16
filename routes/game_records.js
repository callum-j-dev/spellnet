const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const GameRecord = require('../models/GameRecord');
const Deck = require('../models/Deck');

// @desc    Show add page
// @route   GET /game_records/add
router.get('/add', ensureAuth, async (req, res) => {
    try  {
        const decks = await Deck.find()
            .populate('user')
            .sort({ createdAt: 'descending' })
            .lean();
        
        res.render('game_records/add', { decks: decks });

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc Add game record
// @route POST /game_records
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.decks = [
            req.body['deck-1'],
            req.body['deck-2'],
            req.body['deck-3'],
            req.body['deck-4']
        ];

        await GameRecord.create(req.body);
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
})

module.exports = router;