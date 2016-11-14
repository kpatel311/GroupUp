import React, {Component} from 'react';

export default class Button extends Component {
  render() {
    return (
        <button
          onClick={this.props.onClick}
          className="btn btn-raised btn-default btn-block">
          {this.props.text}
        </button>
    );
  }
}
