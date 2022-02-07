import React, { lazy, Suspense } from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Spinner, Pane } from 'evergreen-ui';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const SignUp = lazy(() => import('../components/SignUp'));
const SignIn = lazy(() => import('../components/SignIn'));
const SignOut = lazy(() => import('../components/SignOut'));
const Gallery = lazy(() => import('../components/Gallery'));
const VideoDetailsPage = lazy(() => import('../components/VideoDetailsPage'));

import { path } from '../utils/constants';

const history = createBrowserHistory();

const routes = (
  <Router history={history}>
    <Suspense fallback={(
      <Pane>
        <Spinner marginX='auto' marginY={120} />
      </Pane>
    )}
    >
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
    </Suspense>
  </Router>
);

export default routes;
