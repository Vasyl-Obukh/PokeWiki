import * as React from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import * as Styles from './styles';

export default class ScrollUpButton extends React.Component {
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
      <Styles.Button
        icon={faArrowUp}
        onClick={() => window.scrollTo(0, 0)}
      />
    ) : null;
  }
}