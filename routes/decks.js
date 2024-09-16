const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Deck = require('../models/Deck');
const GameRecord = require('../models/GameRecord');

// @desc    Show add page
// @route   GET /decks/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('decks/add');
});

// @desc    Process add form
// @route   POST /decks
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Deck.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
})

// @desc    Show all decks
// @route   GET /decks/index
router.get('/', ensureAuth, async (req, res) => {
    try {
        const decks = await Deck.find()
            .populate('user')
            .sort({ createdAt: 'descending' })
            .lean();

        res.render('decks/index', {
            decks,
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Show single story
// @route   GET /decks/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.id)
        .populate('user')
        .lean();

        if (!deck) {
            return res.render('error/404');
        }

        let wins = await GameRecord.find({
            winner: req.params.id
        });

        let games = await GameRecord.find({
            decks: req.params.id
        });

        let gamesCount = games.length;
        let winCount = wins.length;
        let lossCount = gamesCount - winCount;

        

        res.render('decks/show', {
            deck,
            gamesCount,
            winCount,
            lossCount
        });


    } catch (err) {
        console.error(err);
        res.render('error/404');
    }
});

// @desc    Show edit page
// @route   GET /decks/edit/":id"
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const deck = await Deck.findOne({
            _id: req.params.id
        }).lean();
    
        if (!deck) {
            return res.render('error/404');
        }
    
        if (deck.user != req.user.id) {
            res.redirect('/decks');
        } else {
            res.render('decks/edit', {
                deck,
            });
        }

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Update deck
// @route   PUT /decks/:id
router.put('/:id', ensureAuth, async (req, res) => {
    let deck = await Deck.findById(req.params.id).lean();

    if (!deck) {
        return res.render('error/404');
    }

    if (deck.user != req.user.id) {
        res.redirect('/decks');
    } else {
        
        try {
            deck = await Deck.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            });
            res.redirect('/dashboard');

        } catch (err) {
            console.error(err);
            res.render('error/500');
        }  
    }
});

// @desc    Delete deck
// @route   DELETE /decks/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.id).lean();

        if (!deck) {
            return res.render('error/404');
        }

        if (deck.user != req.user.id) {
            res.redirect('/decks');
        } else {
            await Deck.deleteOne({ _id: req.params.id });
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc    Show User decks
// @route   GET /decks/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const decks = await Deck.find({
            user: req.params.userId,
        })
        .populate('user')
        .lean();

        res.render('decks/index', {
            decks
        });

    } catch (err) {
        console.error(err);
        res.render('error/500')
    }
});

module.exports = router;