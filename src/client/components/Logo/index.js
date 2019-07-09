import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import paths from '../../constants/paths';

const LogoLink = styled(Link)`

`;

const LogoImage = styled.img`
  width: 144px;
  height: 66px;
`;

const Logo = () => {
  return (
    <LogoLink to={paths.HOME}>
      <LogoImage src='../../assets/images/logo.png' alt='logo'/>
    </LogoLink>
  );
};

export default Logo;