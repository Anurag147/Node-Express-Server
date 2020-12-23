const passport = require('passport'); //Load passport for oAuth

module.exports = (app) => {
    //Handle google authentication 
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }));

    //Handle google authentication callback 
    app.get('/auth/google/callback', passport.authenticate('google'));
};
