const passport = require('passport');
const GoogleStratgey = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('user');

passport.use(new GoogleStratgey({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, 
(accessToken, refreshToken, profile, done) => {
    new User({googleID: profile.id}).save();
}));