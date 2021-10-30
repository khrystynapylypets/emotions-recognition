import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../helpers';
import { path } from '../utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const routeComponent = (props) => (
    !getAccessToken()
      ? <Redirect to={path.SIGN_IN} />
      : <Component {...props} />
  );

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
