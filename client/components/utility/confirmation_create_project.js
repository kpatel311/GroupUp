import React, { Component } from 'react';
import Confirmation from './confirmation';

export default class ConfirmationCreateProject extends Component {
  render() {
    return (
      <Confirmation
        title="You just created a new project!"
        message="Click continue to see your project main page."
        link="/professor-dashboard"
        />
    );
  }
}
