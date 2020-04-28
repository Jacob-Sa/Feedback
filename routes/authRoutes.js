const passport = require('passport')
const path = require('path');

//exporting both route handles because 'app' is not defined
module.exports = (app) => {
    //forward user request to google
    
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }))
    //put user on hold and take the 'code' from the url and exchanging it for profile info
    app.get('/auth/google/callback', passport.authenticate('google'),(req,res)=>{
        res.redirect('/surveys')
    })
    
    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope:['user_friends'],
        }))
    app.get('/auth/facebook/callback', passport.authenticate('facebook'))    

    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    })

app.get('/api/current_user', (req, res)=>{
        res.send(req.user);
    })

    //enabling  using google-auth with heroku domain
    app.get('/google88a4f773616f82b9.html',(req,res)=>{
        res.sendFile(path.join(__filename+'/../../google88a4f773616f82b9.html'))
    })
};
