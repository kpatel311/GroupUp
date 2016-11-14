import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Confirmation extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-center">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>{this.props.title}</h3>
            </div>
            <div className="panel-body">
              <h4 className="margin-bottom">{this.props.message}</h4>
              <Link to={this.props.link}>
                <button
                  className="btn btn-raised btn-default btn-block">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
