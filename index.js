const express = require('express'); //Load Express server
const passport = require('passport'); //Load passport for oAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Load google oauth strategy
const keys = require('./config/keys'); //Load keys from configuration file
const app = express();//Create instance of express server

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

//Handle google authentication 
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

//Handle google authentication callback 
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
