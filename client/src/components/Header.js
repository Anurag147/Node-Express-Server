import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component{
    renderContent(){
        console.log(this.props.auth);
        switch(this.props.auth){
            case null:
                return '';
            case false:
                return (
                    <li>
                        <a href="/auth/google">Log In With Google</a>
                    </li>
                );
            default: //Returning an array of elements. It is allowed only in latest versions of react
                return ( 
                    [                                 
                    <li key="A"><Payments/></li>,
                    <li style={{marginLeft:'5px'}} key = "B">Credits: <strong>{this.props.auth.credits}</strong></li>,
                    <li key="C"><a href="/api/logout">Log Out</a></li> 
                    ]       
                );        
        }
    }
    render(){
        return (
            <nav>
                <div className = "nav-wrapper">
                    <Link to ={this.props.auth ? '/surveys' : '/'} className = "left brand-logo">
                        Survey App
                    </Link>
                    <ul className="right">
                      {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Header);