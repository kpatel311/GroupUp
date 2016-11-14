import React, { Component } from 'react';
import Confirmation from './confirmation';

export default class ConfirmationAccount extends Component {
  render() {
    return (
      <Confirmation
        title="Your GroupUp profile is set up!"
        message="Now you are ready to start using GroupUp!"
        link="/professor-dashboard"
        />
    );
  }
}
