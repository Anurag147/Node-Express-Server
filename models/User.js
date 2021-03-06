const mongoose = require('mongoose');//Load mongoose module

//Define mongoose schema, this is defined for assigning schema to mongo db documents
const schema = mongoose.Schema;
const userSchema = new schema({
    googleID:String,
    credits: {type:Number,default:0}
});
mongoose.model('users',userSchema);//Create a new collection named users with provided schema