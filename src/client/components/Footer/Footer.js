import React from 'react';
import styled from 'styled-components';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.backgroundPrimary};
`;

const FooterWrapper = styled.div`
  padding: 25px;
`;

const Copyright = styled.p`
  text-align: center;
  color: ${props => props.theme.colorSecondary}
`;

const Footer = () => {
  const copyright = 'Copyright © 2019 by Vasyl Obukh. All Rights Reserved.';
  return (
    <FooterContainer>
      <SectionWrapper>
        <FooterWrapper>
          <Copyright>{copyright}</Copyright>
        </FooterWrapper>
      </SectionWrapper>
    </FooterContainer>
  );
};

export default Footer;