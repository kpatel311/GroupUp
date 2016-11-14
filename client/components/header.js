import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Header extends Component {
  logout() {
    Meteor.logout(() => {
      console.log("logout successful!");
    });
    //browserHistory.push("/");
  }

  render() {
    return (
      <nav className="nav navbar-default">
        <div>
          <Link to="/" className="navbar-brand">HOME</Link>
          <Link to="/" onClick={this.logout.bind(this)} className="navbar-brand float-right">LOG OUT</Link>
        </div>
      </nav>
    );
  }
}
