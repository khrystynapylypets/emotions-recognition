import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Heading, Pane, PredictiveAnalysisIcon, Button, LogOutIcon } from 'evergreen-ui';
import { StyledLink } from '../../styledComponents';

import theme from '../../utils/theme';
import { path } from '../../utils/constants';
import { message } from '../../helpers';

import authActions from '../../redux/actions/auth';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authActions.signOutAction());

    history.push(path.SIGN_OUT);
  };

  return (
    <Pane
      display='flex'
      padding={25}
      background={theme.panelColor}
      boxShadow={theme.boxShadow}
    >
      <Pane
        flex={1}
        alignItems='center'
        display='flex'
      >
        <PredictiveAnalysisIcon size={30} color={theme.primaryColor} />
        <StyledLink
          to={path.GALLERY}
        >
          <Heading
            size={700}
            marginLeft={10}
            textDecoration='none'
            color={theme.primaryColor}
          >
            {message('title')}
          </Heading>
        </StyledLink>
      </Pane>
      <Pane marginRight={50}>
        <Button
          iconBefore={LogOutIcon}
          onClick={logOut}
          size='large'
        >
          {message('logOut')}
        </Button>
      </Pane>
    </Pane>
  );
};

export default Header;
