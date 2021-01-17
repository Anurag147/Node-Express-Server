const express = require('express'); //Load Express server
const mongoose = require('mongoose');//Load mongoose package to connect with MongoDB
require('./models/User');//Load mongoose model
require('./models/Survey');//Load survey model
require('./services/passport');//Load passport configuration
const authRoutes = require('./routes/authRoutes');//Load auth routes
const billingRoutes = require('./routes/billingRoutes');//Load auth routes
const surveyRoutes = require('./routes/surveyRoutes');
const keys = require('./config/keys'); //Load keys from configuration file
const passport = require('passport');//Load passport module
const cookiesession = require('cookie-session');//Load cookie sessions module 
const bodyParser = require('body-parser'); //Express middleware to use body object in incoming requests

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });//Connect to mongo DB instance

const app = express();//Create instance of express server

//Enable express middleware to parse the body and assign it to req.body
app.use(bodyParser.json());

//Enforce app to use cookie sessions
app.use(
    cookiesession({
        maxAge: 30 * 24 * 60 * 60 * 100, //Cookie will be valid for 30 days
        keys:[keys.cookieKey] //Encrypt the cookie by the key provided in the cofiguration file
    })
);
app.use(passport.initialize());
app.use(passport.session());//use passport sessions in this express application

authRoutes(app); //Initialize auth routes with express
billingRoutes(app); //Initialize billing routes with express
surveyRoutes(app); //Initialize survey routes with express

//Configuration for serving react app and node app only from Heroku production
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000; //Define port for use
app.listen(PORT);//Listen for the new requests on port 5000
