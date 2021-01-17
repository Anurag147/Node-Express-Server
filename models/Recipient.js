const mongoose = require('mongoose');//Load mongoose module

//Define mongoose schema, this is defined for assigning schema to mongo db documents
const schema = mongoose.Schema;

const recipientSchema = new schema({
    email:String,
    responded: {type:Boolean,default:false}
});

module.exports = recipientSchema; //Export this as it a subcollection in surveys model