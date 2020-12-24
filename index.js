const express = require('express'); //Load Express server
const mongoose = require('mongoose');//Load mongoose package to connect with MongoDB
require('./models/User');//Load mongoose model
require('./services/passport');//Load passport configuration
const authRoutes = require('./routes/authRoutes');//Load auth routes
const keys = require('./config/keys'); //Load keys from configuration file
const passport = require('passport');//Load passport module
const cookiesession = require('cookie-session');//Load cookie sessions module 

const app = express();//Create instance of express server

//Enforce app to use cookie sessions
app.use(
    cookiesession({
        maxAge: 30 * 24 * 60 * 60 * 100, //Cookie will be valid for 30 days
        keys:[keys.cookieKey] //Encrypt the cookie by the key provided in the cofiguration file
    })
);
app.use(passport.initialize());
app.use(passport.session());//use passport sessions in this express application

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });//Connect to mongo DB instance
authRoutes(app); //Initialize auth routes with express

const PORT = process.env.PORT || 5000; //Define port for use
app.listen(PORT);//Listen for the new requests on port 5000
