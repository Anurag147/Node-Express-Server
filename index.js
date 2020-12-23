const express = require('express'); //Load Express server
const mongoose = require('mongoose');//Load mongoose package to connect with MongoDB
const passportConfig = require('./services/passport');//Load passport configuration
const authRoutes = require('./routes/authRoutes');//Load auth routes
const keys = require('./config/keys'); //Load keys from configuration file
const app = express();//Create instance of express server
mongoose.connect(keys.mongoURI);//Connect to mongo DB instance
authRoutes(app); //Initialize auth routes with express
const PORT = process.env.PORT || 5000;
app.listen(PORT);
