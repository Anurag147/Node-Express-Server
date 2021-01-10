import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component{
    render(){
        return(
            <StripeCheckout 
            name = "Add Credits"
            description = "$5 credits"
            amount = {500}  //500 cents
            token={(token)=>{this.props.handleToken(token)}} //API callback from stripe, pass it to Node JS API
            stripeKey = {process.env.REACT_APP_STRIPE_KEY} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleToken: (token) => {dispatch(actions.handleToken(token))}
    }
}

export default connect(null,mapDispatchToProps)(Payments);