import * as React from 'react';
import * as Styles from './styles';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import paths from '../../constants/paths';

type DispatchProps = {
  resetForm: () => void
}

type Props = DispatchProps; // | StateProps

export const Logo = (props: Props) => {
  const { resetForm } = props;

  return (
    <Styles.StyledLink to={paths.HOME} onClick={resetForm}>
      <Styles.Image src='../../static/images/logo.png' alt='logo'/>
    </Styles.StyledLink>
  );
};

export const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('filter'))
});

export default connect(
  null,
  mapDispatchToProps
)(Logo);