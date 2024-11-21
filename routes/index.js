const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Deck = require('../models/Deck');
const mainController = require('../controllers/main');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, mainController.getLogin);

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, mainController.getDashboard);




module.exports = router;