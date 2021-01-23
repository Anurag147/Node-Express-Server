import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends React.Component {
    componentDidMount(){
        //dispatch action
        this.props.fetch();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                 <div>
                     <Header/>
                     <Route path="/surveys/new" component = {SurveyNew} />
                     <Route path="/surveys" component = {Dashboard} exact/>
                     <Route path="/" component = {Landing} exact/>
                 </div>
                </BrowserRouter>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetch: () => {dispatch(actions.fetchUser())}
    }
}

export default connect(null,mapDispatchToProps)(App);