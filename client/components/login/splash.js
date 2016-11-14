import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import UserLogin from './user_login';

export default class Splash extends Component {
  createStudentAccount() {
    //Route
    browserHistory.push('/registration/' + 'student');
  }

  createProfessorAccount() {
    //Route
    browserHistory.push('/registration/' + 'professor');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-center">
            <img className="main-title" src="/images/GroupUpIcon.png" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="panel panel-default height-50-percent">
              <div className="panel-heading">
                <h3>Already a user?</h3>
              </div>
              <div className="panel-body">
                <UserLogin />
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="panel panel-default height-50-percent">
              <div className="panel-heading">
                <h3>Want to create an account?</h3>
              </div>
              <div className="panel-body">
                <button className="btn btn-raised btn-block btn-default" onClick={this.createStudentAccount.bind(this)}>Create Student Account</button>
                <br />
                <button className="btn btn-raised btn-block btn-default" onClick={this.createProfessorAccount.bind(this)}>Create Professor Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
