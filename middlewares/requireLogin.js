const { model } = require("mongoose");

module.exports = (req,res,next) => {
    if(!req.user){
        return res.status(401).send();//user should be login
    }
    next();//go to next request
}