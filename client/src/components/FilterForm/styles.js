import styled from 'styled-components';
import {FormSection} from 'redux-form';

export const Form = styled.form`
  padding: 0 50px;
`;

export const StyledFormSection = styled(FormSection)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Label = styled.label`
  margin-left: 5px;
`;

export const FormButton = styled.button`
  padding: 5px 10px;
  margin-top: 25px;
  width: 100%;
  border-radius: 20px;
  background-color: ${props => props.theme.backgroundPrimary};
  text-transform: capitalize;
  color: white;
  border: none;
  cursor: pointer;
`;