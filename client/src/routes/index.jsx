import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Gallery from '../components/Gallery';

import { path } from '../utils/constants';

const history = createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <PrivateRoute
        exact
        path={path.GALLERY}
        component={Gallery}
      />
      <PublicRoute path={path.SIGN_UP} component={SignUp} />
      <PublicRoute path={path.SIGN_IN} component={SignIn} />
    </Switch>
  </Router>
);

export default routes;
