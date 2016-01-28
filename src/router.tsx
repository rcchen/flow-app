import React = require('react');

import { App, About, Login, Upload } from './views';

import { hashHistory, IndexRoute, Route, Router } from 'react-router';

export class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={About} />
          <Route path="about" component={About} />
          <Route path="login" component={Login} />
          <Route path="upload" component={Upload} />
        </Route>
      </Router>
    );
  }
}
