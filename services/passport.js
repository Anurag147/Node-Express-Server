const passport = require('passport'); //Load passport for oAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Load google oauth strategy
const keys = require('../config/keys'); //Load keys from configuration file

//Assign passport to use google strategy for oAuth
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'/auth/google/callback'
    },
    (accessToken,refreshToken,profile,done)=>
    {
        console.log(accessToken);//Log access token recieved
        console.log(refreshToken);//Log refresh token recieved
        console.log(profile);//Log profile recieved 
    }
));