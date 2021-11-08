import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Gallery from '../components/Gallery';
import VideoDetailsPage from '../components/VideoDetailsPage';

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
      <PrivateRoute
        exact
        path={path.VIDEO_DETAILS_PAGE}
        component={VideoDetailsPage}
      />
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
    </Switch>
  </Router>
);

export default routes;
