module.exports = (req,res,next) => {
    if(req.user.credits<1){
        return res.status(403).send();//user should have enough credit to proceed
    }
    next();//go to next request
}