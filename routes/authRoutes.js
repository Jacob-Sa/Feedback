const passport = require('passport')

//exporting both route handles because 'app' is not defined
module.exports = (app) => {
    //forward user request to google
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }))
    //put user on hold and take the 'code' from the url and exchanging it for profile info
    app.get('/auth/google/callback', passport.authenticate('google'))
    
    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.send(req.user)
    })

    app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    })
};