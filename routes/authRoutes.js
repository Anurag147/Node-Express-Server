const passport = require('passport'); //Load passport for oAuth

module.exports = (app) => {
    //Handle google authentication 
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }));

    //Handle google authentication callback 
    app.get('/auth/google/callback', 
    passport.authenticate('google'),
    (req,res)=>{
        res.redirect('/surveys');//Redirect it to client application route after successfull login
    });

    //Get current logged in user
    app.get('/api/currentuser',(req,res)=>{
        console.log(req);
        res.send(req.user);
    });

    //logout user
    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });
};
