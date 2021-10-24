import React from 'react';
import { PublicLayoutContainer, Container } from '../../styledComponents';

export const PublicLayout = ({ children }) => {
  return (
    <PublicLayoutContainer>
      <Container>
        {children}
      </Container>
    </PublicLayoutContainer>
  );
};

export default PublicLayout;
