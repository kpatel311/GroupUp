import React, {Component} from 'react';

export default class AlertConfirmation extends Component {
  render() {
    return (
      <div className="alert alert-primary text-center">
        {this.props.message}
      </div>
    );
  }
}
