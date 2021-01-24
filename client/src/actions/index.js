import axios from 'axios';
import {FETCH_USER} from './types';

//This is a redux thunk syntax
//Redux thunk gives us access to manually dispatching the action when api call is completed
//If we dont use redux thunk then the action will be dispatched asynchronously without the api returned data

export const fetchUser = () => {
    return async (dispatch) => {
        const response = await axios.get('/api/currentuser');
        console.log(response);
        dispatch({type: FETCH_USER,payload:response.data});//Dispatch this action manually
    }
}

export const handleToken = (token) => {
    return async (dispatch) => {
        console.log(token);
        const response = await axios.post('/api/stripe',token);
        dispatch({type: FETCH_USER,payload:response.data});//Dispatch this action manually
    }
}

export const submitSurvey = (values,history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
  };
