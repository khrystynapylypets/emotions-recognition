import styled from 'styled-components';
import { Pane } from 'evergreen-ui';
import theme from '../utils/theme';

export const PublicLayoutContainer = styled.div`
  margin: 0;
  padding: 0;
`;

export const Container = styled.div`
  max-width: ${theme.containerWidth};
  margin: 0px auto;
`;

export const AuthPanel = styled(Pane)`
  max-width: ${theme.authPanelWidth};
  padding: 25px;
  margin: 80px auto;
  background: ${theme.authPanelColor};
`;
