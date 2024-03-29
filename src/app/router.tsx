import React = require('react');

import { App } from "./app";
import { About, Analysis, Login, Upload } from '../views';

import { browserHistory, IndexRoute, Route, Router } from 'react-router';

export const BASE_PATH = window.location.pathname;

export class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <Router history={browserHistory}>
        <Route path={BASE_PATH} component={App}>
          <IndexRoute component={Analysis} />
          <Route path="about" component={About} />
          <Route path="login" component={Login} />
          <Route path="upload" component={Upload} />
        </Route>
      </Router>
    );
  }
}
