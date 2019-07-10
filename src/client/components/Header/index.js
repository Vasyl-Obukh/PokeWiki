import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as Styles from './styles';
import SectionWrapper from '../SectionWrapper';
import Logo from '../Logo';
import Search from '../Search';

export const Header = (props) => {
  const handleSubmit = values => {
    props.history.push(`/?search=${values.search}`);
  };

  return (
    <Styles.Header>
      <SectionWrapper>
        <Styles.Wrapper>
          <Logo />
          <Search onSubmit={handleSubmit} />
        </Styles.Wrapper>
      </SectionWrapper>
    </Styles.Header>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Header);