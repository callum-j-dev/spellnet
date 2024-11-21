const passport = require("passport");
const User = require("../models/User");

exports.getGoogleCallback = (req, res) => {
    res.redirect('/dashboard');
}

exports.getLogout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
    });
    res.redirect('/');
}