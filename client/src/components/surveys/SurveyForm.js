import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; 
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends Component{
    renderFields(){
        return (
            <div>
                <Field label="Survey Title" type="text" name="title" component={SurveyField}/>
                <Field label="Subject Line" type="text" name="subject" component={SurveyField}/>
                <Field label="Email Body" type="text" name="body" component={SurveyField}/>
                <Field label="Email Recipient" type="text" name="recipients" component={SurveyField}/>
            </div>
        );
    };
    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>                                 
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    if(!values.title){
        errors.title = "You must provide a title to proceed";
    }
    if(!values.subject){
        errors.subject = "You must provide a subject to proceed";
    }
    if(!values.body){
        errors.body = "You must provide a body to proceed";
    }
    return errors; //If an empty object is returned it means there are no errors and validations are passed
}

export default reduxForm({
    validate:validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm); //Integrate redux form to this component