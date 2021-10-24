import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from './PublicRoute';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

import { path } from '../utils/constants';

const history = createBrowserHistory();

export default (
  <Router history={history}>
    <Switch>
      <PublicRoute path={path.SIGN_UP} component={SignUp} />
      <PublicRoute path={path.SIGN_IN} component={SignIn} />
    </Switch>
  </Router>
);
