import * as React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as Styles from './styles';

const Spinner: React.FC = () => <Styles.StyledSpinner icon={faSpinner} />;

export default Spinner;