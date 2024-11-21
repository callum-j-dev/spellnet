const express = require('express');
const GameRecord = require('../models/GameRecord');
const Deck = require('../models/Deck');

module.exports = {
    getAddPage: async (req, res) => {
        try {
            const decks = await Deck.find()
                .populate('user')
                .sort({ createdAt: 'descending' })
                .lean();
            res.render('game_records/add', { decks: decks });
        } catch (err) {
            console.error(err);
            res.render('error/500');
        }
    },
    addGameRecord: async (req, res) => {
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
    }
}