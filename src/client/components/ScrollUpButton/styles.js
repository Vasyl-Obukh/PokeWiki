import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Button = styled(FontAwesomeIcon)`
  position: fixed;
  display: block;
  bottom: 150px;
  right: calc((100vw - ${props => props.theme.basicWidth}) / 2);
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.backgroundPrimary};
  font-size: 25px;
  color: white;
  cursor: pointer;

  && {
    width: 50px;
  }
`;