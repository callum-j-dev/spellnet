const mongoose = require('mongoose');

const GameRecordSchema = new mongoose.Schema({
    decks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    }],
    winner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GameRecord', GameRecordSchema);