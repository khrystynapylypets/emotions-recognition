import React from 'react';
import { PrivateLayoutContainer } from '../../styledComponents';
import Header from '../Header';

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <PrivateLayoutContainer>
        {children}
      </PrivateLayoutContainer>
    </>
  );
};

export default PrivateLayout;
