//Production keys which will be fetched by Heroku environment variables
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookeiKey: process.env.COOKIE_KEY
};

