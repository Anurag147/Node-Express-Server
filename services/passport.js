const passport = require('passport'); //Load passport for oAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Load google oauth strategy
const keys = require('../config/keys'); //Load keys from configuration file
const mongoose = require('mongoose');
const User = mongoose.model('users');

//Serialize user using the user id and set the user id into cookie
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//Deserialize user using the user id by finding the user in mongodb collection
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        done(null,user)
    });
});

//Assign passport to use google strategy for oAuth
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'/auth/google/callback'
    },
    (accessToken,refreshToken,profile,done)=>
    {
        const profileID = profile.id;
        //Check if user exists in database
        User.findOne({
            googleID:profileID
        })
        .then((existingUser)=>{
            if(!existingUser){
                //Save user to database
                const newUser = new User({googleID:profile.id});
                newUser
                .save()
                .then((user)=>{
                    done(null,user) //Passport js callback to finish the processing
                });
            }
            else{
                console.log("user found");
                done(null,existingUser) //Passport js callback to finish the processing
            }
        })
        .catch((err)=>{
            console.log(err)
        });
    }
));