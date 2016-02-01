import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Needed for onTouchTap
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

// Source imports
import { AppRouter } from './router';

// Wait until content loaded, then render React app to DOM
document.addEventListener('DOMContentLoaded', (event) => {
  const container = document.createElement('div');
  ReactDOM.render(<AppRouter />, container);
  document.body.appendChild(container);
});
