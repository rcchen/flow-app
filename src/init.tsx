import React = require('react');
import ReactDOM = require('react-dom');

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { syncHistory, routeReducer } from 'react-router-redux'

// Needed for onTouchTap
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// Source imports
import { AppRouter } from './router';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Wait until content loaded, then render React app to DOM
document.addEventListener('DOMContentLoaded', (event) => {
  const container = document.createElement('div');
  ReactDOM.render(<AppRouter />, container);
  document.body.appendChild(container);
});
