import * as React from 'react';
import SectionWrapper from '../SectionWrapper';
import * as Styles from './styles';

const defaultCopyright = 'Copyright © 2019 by Vasyl Obukh. All Rights Reserved.';

type Props = {
  copyright?: string
};

const Footer = (props: Props) => {
  const { copyright = defaultCopyright } = props;

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