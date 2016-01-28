import React = require('react');
import ReactDOM = require('react-dom');

// Needed for onTouchTap
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import { AppRouter } from './router';

document.addEventListener('DOMContentLoaded', (event) => {
  const container = document.createElement('div');
  ReactDOM.render(<AppRouter />, container);
  document.body.appendChild(container);
});
