import styled from 'styled-components';
import {Field} from 'redux-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Form = styled.form`
  position: relative;
`;

export const StyledField = styled(Field)`
  padding: 10px 15px 10px 35px;
  width: 150px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 5px darkslategray;
  transition: all .5s;
  
  &:focus {
    width: 350px;
    box-shadow: -2px 2px 5px darkslategray;
  }
`;

export const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: calc(50% - 8px);
`;