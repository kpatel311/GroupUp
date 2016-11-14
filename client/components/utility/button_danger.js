import React, {Component} from 'react';

export default class ButtonDanger extends Component {
  render() {
    return (
        <button
          onClick={this.props.onClick}
          className="btn btn-raised btn-danger btn-block">
          {this.props.text}
        </button>
    );
  }
}
