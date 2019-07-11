import React from 'react';
import * as Styles from './styles';
import paths from '../../constants/paths';

const Logo = () => {
  return (
    <Styles.StyledLink to={paths.HOME}>
      <Styles.Image src='../../static/images/logo.png' alt='logo'/>
    </Styles.StyledLink>
  );
};

export default Logo;