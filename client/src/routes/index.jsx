import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import Gallery from '../components/Gallery';
import VideoDetailsPage from '../components/VideoDetailsPage';

import { path } from '../utils/constants';

const history = createBrowserHistory();

const routes = (
  <Router history={history}>
    <Switch>
      <PublicRoute
        exact
        path={path.SIGN_UP}
        component={SignUp}
      />
      <PublicRoute
        exact
        path={path.SIGN_IN}
        component={SignIn}
      />
      <PrivateRoute
        exact
        path={path.GALLERY}
        component={Gallery}
      />
      <PrivateRoute
        exact
        path={path.VIDEO_DETAILS_PAGE}
        component={VideoDetailsPage}
      />
      <PublicRoute
        exact
        path={path.SIGN_OUT}
        component={SignOut}
      />
      <Redirect to={path.SIGN_IN} />
    </Switch>
  </Router>
);

export default routes;
