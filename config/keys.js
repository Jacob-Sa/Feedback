//figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    module.exports= require('./prod')
} else {
    module.exports =   require('./dev');
}



//googleClientID: 454922372678-ga972ms1p9bml1laji1bgjcdvs84hne0.apps.googleusercontent.com

//googleClientSecret: oarRNeIyAGbv3_oky3PFHge4