const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Deck = require('../models/Deck');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    });
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    console.log(req.user);
    try {
        const decks = await Deck.find({ user: req.user.id }).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            decks
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});




module.exports = router;