import * as React from 'react';
import SectionWrapper from '../SectionWrapper';
import * as Styles from './styles';

const defaultCopyright = 'Copyright © 2019 by Vasyl Obukh. All Rights Reserved.';

const Footer = ({ copyright = defaultCopyright }) => {
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