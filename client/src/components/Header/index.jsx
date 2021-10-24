import React from 'react';
import { Heading, Pane, PredictiveAnalysisIcon } from 'evergreen-ui';
import Menu from '../Menu';

import theme from '../../utils/theme';
import { message } from '../../helpers';

const Header = () => {
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
        <Heading
          size={700}
          marginLeft={10}
          color={theme.primaryColor}
        >
          {message('title')}
        </Heading>
      </Pane>
      <Pane marginRight={100}>
        <Menu />
      </Pane>
    </Pane>
  );
};

export default Header;
