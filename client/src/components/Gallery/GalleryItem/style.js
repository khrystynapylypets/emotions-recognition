import styled from 'styled-components';
import { Pane } from 'evergreen-ui';
import theme from '../../../utils/theme';

export const FlexPanel = styled(Pane)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledGalleryItem = styled(FlexPanel)`
  width: 48%;
  flex-direction: column;
  border: ${theme.border};
  background-color: ${theme.panelColor};
`;

export const VideoWrapper = styled.div`
  height: 60%;
`;
