import React from 'react';
import { Container } from '../../styledComponents';

const PublicLayout = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default PublicLayout;
