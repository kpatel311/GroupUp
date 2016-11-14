import React, {Component} from 'react';

export default class WarningMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-dismissible alert-danger">
        {this.props.message}
      </div>
    );
  }
}
