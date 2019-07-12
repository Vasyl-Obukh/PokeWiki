import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import paths from '../../constants/paths';

export const Logo = ({ resetForm }) => {
  return (
    <Styles.StyledLink to={paths.HOME} onClick={resetForm}>
      <Styles.Image src='../../static/images/logo.png' alt='logo'/>
    </Styles.StyledLink>
  );
};

Logo.propTypes = {
  resetForm: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('filter'))
});

export default connect(
  null,
  mapDispatchToProps
)(Logo);