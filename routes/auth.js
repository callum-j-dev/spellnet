const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth');

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile' ]}));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//     res.redirect('/dashboard');
//     }
// );
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), authController.getGoogleCallback);

// @desc    Logout User
// @route   GET /auth/logout
// router.get('/logout', (req, res, next) => {
//     req.logout(function(err) {
//         if (err) {
//             return next(err);
//         }
//     });
//     res.redirect('/');
// });
router.get('/logout', authController.getLogout);


module.exports = router;