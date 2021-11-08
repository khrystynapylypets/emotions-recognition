import styled, { css } from 'styled-components';
import { Tablist, Tab, Text, Pane } from 'evergreen-ui';
import theme from '../../utils/theme';

export const StyledTabList = styled(Tablist)`
  background: ${theme.panelColor};
  padding: 20px;
  height: 100%;
  margin-bottom: 20px;
  margin-right: 20px;
  box-shadow: ${theme.boxShadow};
`;

const activeStyles = css`
  background: ${theme.primaryColor} !important;
`;

const activeText = css`
  color: #fff;
  font-weight: bold;
`;

export const StyledTab = styled(Tab)`
  height: auto;
  width: 100%;
  padding: 15px;
  margin: 0 0 15px 0;
  text-align: center;
  background: ${theme.primaryLightColor} !important;
  ${props => props.selected && activeStyles}
`;

export const StyledTabName = styled(Text)`
  ${props => props.selected && activeText}
`;

export const StyledTabContentWrapper = styled(Pane)`
  flex: 1;
  padding: 25px;
  background: ${theme.panelColor};
  box-shadow: ${theme.boxShadow};
  overflow: auto;
`;
