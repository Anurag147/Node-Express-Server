import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyReview = (props) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                <h5>Survey Title</h5>
                <p>{props.formValues.title}</p>
            </div>
            <div>
                <h5>Subject Line</h5>
                <p>{props.formValues.subject}</p>
            </div>
            <div>
                <h5>Email Body</h5>
                <p>{props.formValues.body}</p>
            </div>
            <div>
                <h5>Email Recipient</h5>
                <p>{props.formValues.recipients}</p>
            </div>
            <button className="yellow white-text  btn-flat" onClick = {props.onCancel}>Back</button>
            <button className = "green btn-flat right white-text" 
            onClick={() => {props.submitSurvey(props.formValues,props.history)}}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        formValues:state.form.surveyForm.values //Bind the redux form values to redux state property here
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        submitSurvey: (values,history) => {dispatch(actions.submitSurvey(values,history))}
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SurveyReview));//withRouter: to use history for redirect