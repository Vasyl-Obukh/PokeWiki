import React, { Component } from 'react';
import styled from 'styled-components';

import Card from '../Card/Card';

class Cards extends Component {
  state = {
    data: []
  };

  render() {
    const { data } = this.state;
    return data.length ? (
      data.map(_ => {
        <Card key={_.id} data={_} />
      })
    ) : null;
  }
}

export default Cards;