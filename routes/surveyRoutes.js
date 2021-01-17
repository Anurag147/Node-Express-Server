const requireLogin = require('../middlewares/requireLogin');//Route level express middleware to check if user is logged in
const requireCredits = require('../middlewares/requireCredits');//Route level express middleware to check if user has enough credits to proceed
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/EmailTemplates/surveyTemplate');
const Survey = mongoose.model('survey');
module.exports = (app) => {
    app.get('/api/surveys/thanks',(req,res) => {
        return res.send('Thanks for submitting the survey');
    });
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const {title, subject, body, recipients} = req.body; //Get all the values from request body
        const survey = new Survey({
            title:title,
            subject:subject,
            body:body,
            recipients:recipients.split(',').map(email=>{return {email:email.trim()}}), //Map the comma seperated emails to new object individually
            _user:req.user.id ,//Mongoose model id for the user,
            dateSent:Date.now()
        });
        //Send an email once survey object is initialised 
        const mailer = new Mailer(survey,surveyTemplate(survey));
        await mailer.send()//Send the email
        await survey.save();//Save the survey
        req.user.credits-=1;//Deduct the credits from survey creator
        const user = await req.user.save();//Save the user into database
        res.send(user);//Send back the user after survey creation
    }); 
};