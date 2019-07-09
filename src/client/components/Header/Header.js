import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

const StyledHeader = styled.header`
  background-color: ${props => props.theme.backgroundPrimary};
  box-shadow: 0 5px 10px darkslategrey;
`;

const HeaderWrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: center;
  justify-content: space-between;
`;

const Header = (props) => {
  const handleSubmit = values => {
    props.history.push(`/?search=${values.search}`);
  };

  return (
    <StyledHeader>
      <SectionWrapper>
        <HeaderWrapper>
          <Logo />
          <Search onSubmit={handleSubmit} />
        </HeaderWrapper>
      </SectionWrapper>
    </StyledHeader>
  );
};

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Header);