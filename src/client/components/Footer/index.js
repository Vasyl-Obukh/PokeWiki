import React from 'react';
import SectionWrapper from '../SectionWrapper';
import * as Styles from './styles';

const Footer = () => {
  const copyright = 'Copyright © 2019 by Vasyl Obukh. All Rights Reserved.';
  return (
    <Styles.Container>
      <SectionWrapper>
        <Styles.Wrapper>
          <Styles.Copyright>{copyright}</Styles.Copyright>
        </Styles.Wrapper>
      </SectionWrapper>
    </Styles.Container>
  );
};

export default Footer;