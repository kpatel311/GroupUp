import React, { Component } from 'react';

export default class PageTitle extends Component {
  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>{this.props.title}</h3>
          </div>
        </div>
    );
  }
}
