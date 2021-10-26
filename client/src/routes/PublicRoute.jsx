import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../helpers';
import { path } from '../utils/constants';

const PublicRoute = ({ component: Component, ...rest }) => {
  const routeComponent = (props) => (
    getAccessToken()
      ? <Redirect to={path.GALLERY} />
      : <Component {...props} />
  );

  return <Route {...rest} render={routeComponent} />;
};

export default PublicRoute;
