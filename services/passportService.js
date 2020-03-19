const passport = require('passport');
const GoogleStratgey = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('user');

//"encoding" the user 
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//turning id to user model instance
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

//defining the google stratgey & adding user to database
passport.use(new GoogleStratgey({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleID: profile.id })
        if (existingUser) {
            return done(null, existingUser)
        }
        const user = await new User({ googleID: profile.id }).save()
        done(null, user)
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookID: profile.id })
        if (existingUser) {
            return done(null, existingUser)
        } else {
            const user = await new User({ facebookID: profile.id }).save()
            done(null, user)
        }
    })
)
