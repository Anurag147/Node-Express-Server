const passport = require('passport'); //Load passport for oAuth

module.exports = (app) => {
    //Handle google authentication 
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }));

    //Handle google authentication callback 
    app.get('/auth/google/callback', passport.authenticate('google'));

    //Get current logged in user
    app.get('/api/currentuser',(req,res)=>{
        res.send(req.user);
    });

    //logout user
    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send(req.user);
    });
};
