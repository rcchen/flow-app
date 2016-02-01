import React = require('react');

import { App, About, Login, Upload } from './views';

import { browserHistory, IndexRoute, Route, Router } from 'react-router';

export const BASE_PATH = window.location.pathname;

export class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <Router history={browserHistory}>
        <Route path={BASE_PATH} component={App}>
          <IndexRoute component={Upload} />
          <Route path="about" component={About} />
          <Route path="login" component={Login} />
          <Route path="upload" component={Upload} />
        </Route>
      </Router>
    );
  }
}
