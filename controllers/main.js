const express = require('express');
const Deck = require('../models/Deck');

module.exports = {
    getLogin: (req, res) => {
        res.render('login', {
            layout: 'login'
        });
    },
    getDashboard: async (req, res) => {
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
    }
}