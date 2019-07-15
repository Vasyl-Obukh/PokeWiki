import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: 275px;
  height: 275px;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 0 5px darkslategray;
`;

export const Info = styled.div`
  display: grid;
  margin-top: 25px;
  grid-template-columns: auto auto;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  justify-content: center;
`;

export const InfoKey = styled.div`
  font-weight: bold;
  text-transform: capitalize;
  text-align: right;
  
  &::after {
    content: ':';
  }
`;

export const InfoValue = styled.div`
  font-style: italic;
  font-weight: ${props => props.primary ? 'bold' : 'normal'};
  text-transform: ${props => props.primary ? 'uppercase' : 'none'};
`;

export const ValueItem = styled.span`
  padding: 5px;
  
  &:not(:first-child) {
    border-left: 1px solid gray;
  }
`;