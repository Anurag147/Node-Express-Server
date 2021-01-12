const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey); //Initialize Stripe API module
const requireLogin = require('../middlewares/requireLogin');//Route level express middleware to check if user is logged in

module.exports = (app) => {
    app.post('/api/stripe', requireLogin ,async (req,res)=>{
        console.log(req.body.id);
       const charge = await stripe.charges.create({
            amount:500, //cents
            currency:'INR', //USD
            description: 'Deducting USD 5 from users credit card',
            source:req.body.id
        });
        console.log(charge);
        req.user.credits+=5;//Increase credits by 5
        const user = await req.user.save(); //Save user in DB
        res.send(user);
    });
};
