import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css'; //Load CSS module
import reduxThunk from 'redux-thunk'; //Middleware for async calls in redux action creators

const store = createStore(reducers,{},applyMiddleware(reduxThunk)); //Create a redux store 

//Render dom with App component
ReactDOM.render(
     <Provider store = {store}>
         <App/>
     </Provider> ,
    document.querySelector('#root')
);