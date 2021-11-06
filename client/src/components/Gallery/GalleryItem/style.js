import styled from 'styled-components';
import theme from '../../../utils/theme';
import { Pane } from 'evergreen-ui';

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

export const StyledVideo = styled.img`
  height: 60%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
