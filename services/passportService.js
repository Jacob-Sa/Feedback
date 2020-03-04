const passport = require('passport');
const GoogleStratgey = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose')
//const keys = require('../config/keys')

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

// //defining the google stratgey & adding user to database
// passport.use(new GoogleStratgey({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback'
// },
//     (accessToken, refreshToken, profile, done) => {
//         User.findOne({ googleID: profile.id })
//             .then((existingUser) => {
//                 if (existingUser) {
//                     done(null, existingUser)
//                 } else {
//                     new User({ googleID: profile.id }).save()
//                         .then(user => {
//                             done(null, user)
//                         })
//                 }
//             })
//     })
// );

// passport.use(new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: '/auth/facebook/callback'
// },
//     (accessToken, refreshToken, profile, done) => {
//        User.findOne({facebookID: profile.id})
//        .then((existingUser)=>{
//            if (existingUser) {
//                done(null, existingUser)
//            } else {
//                new User({facebookID: profile.id}).save()
//                .then(user=>{
//                    done(null, user)
//                })
//            }
//        })
//     })
// )
