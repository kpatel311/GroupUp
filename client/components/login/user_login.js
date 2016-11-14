import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class UserLogin extends Component {
  onSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    if (password != "" && email != "") {
      Meteor.loginWithPassword(email, password, (error) => {
        if(error) {
          console.log("Could not log in");
        } else {
          //Re-direct them to a page
          browserHistory.push('/professor-dashboard/');
        }
      });
    } else {
      console.log("Empty fields");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Login</h3>
            <form>
              <div className="form-group">
                <input ref="email" type="text" name="email" placeholder="Enter email..." className="form-control"/>
              </div>
              <div className="form-group">
                <input ref="password" type="password" name="password" placeholder="Enter password..." className="form-control" />
              </div>
            </form>
            <button
              onClick={this.onSubmit.bind(this)}
              className="btn btn-raised btn-default">
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
}
