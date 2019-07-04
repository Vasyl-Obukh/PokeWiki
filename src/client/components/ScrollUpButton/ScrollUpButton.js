import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled(FontAwesomeIcon)`
  position: fixed;
  display: block;
  bottom: 150px;
  right: 50px;
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

export default class ScrollUpButton extends Component {
  state = {show: false};
  distance = 200;

  componentDidMount() {
    this.checkForScroll();
    window.addEventListener('scroll', this.checkForScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkForScroll);
  }

  checkForScroll = () => {
    this.setState({
      show: document.documentElement.scrollTop > this.distance
    });
  };

  render() {
    return this.state.show ? (
      <StyledButton
        icon={faArrowUp}
        onClick={() => window.scrollTo(0, 0)}
      />
    ) : null;
  }
}