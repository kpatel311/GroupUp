import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Card extends Component {
  render() {
    return (
      <div className="col-sm-4">
        <Link to={this.props.link} className="no-link-style">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3 className="margin-bottom text-center">{this.props.title}</h3>
              <h4 className="margin-bottom text-center">{this.props.message}</h4>
                <button
                  className="btn btn-raised btn-default btn-block">
                  {this.props.buttonText}
                </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
