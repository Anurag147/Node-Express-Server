const mongoose = require('mongoose');//Load mongoose module
const RecipientSchema = require('./Recipient');

//Define mongoose schema, this is defined for assigning schema to mongo db documents
const schema = mongoose.Schema;

const surveySchema = new schema({
    title:String, //Title of the survey email
    body:String, //Body of the survey email
    subject:String, //Subject of the survey email
    recipients:[RecipientSchema], //All recipients in an array
    yes: {type:Number,default:0},
    no: {type:Number,default:0},
    _user:{type: mongoose.Schema.Types.ObjectId, ref:'User'}, //This is a reference/relationship to user object by id
    dateSent:Date,
    lastResponded:Date
});

mongoose.model('survey',surveySchema);//Create a new collection named surveys with provided schema