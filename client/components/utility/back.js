import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Back extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <Link to={this.props.link}>
            <button
              className="btn btn-raised btn-default">
              &larr; Back
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
