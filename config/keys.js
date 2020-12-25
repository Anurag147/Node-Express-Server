//Check if environment varaible NODE_ENV is set to production [This is done by heroku]
if(process.env.NODE_ENV === 'production'){
    //We are in production, return production keys
    module.exports = require('./prod');
}
else{
    //we are in development environment, return Dev keys
    module.exports = require('./dev');
}