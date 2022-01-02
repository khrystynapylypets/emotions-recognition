import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paragraph, Link } from 'evergreen-ui';

import authActions from '../../redux/actions/auth';
import PublicLayout from '../Layout/PublicLayout';
import { path } from '../../utils/constants';
import { message } from '../../helpers';

const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.signOut());
  }, []);

  return (
    <PublicLayout>
      <Paragraph>
        Your session has expired, please login again.
        &nbsp;
        <Link href={path.SIGN_IN} color='neutral'>{message('auth.signIn.title')}</Link>
      </Paragraph>
    </PublicLayout>
  );
};

export default SignOut;
