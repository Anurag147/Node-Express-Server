//Custom field for redux forms
import React from 'react';

const SurveyField = (props) => {
    return(
        <div>
            <label>{props.label}</label>
            <input {...props.input}/>
            <label style={{color:'red',marginBottom:'20px'}}>
                {props.meta.error && props.meta.touched? props.meta.error:""}
            </label>
        </div>
    )
};

export default SurveyField;

