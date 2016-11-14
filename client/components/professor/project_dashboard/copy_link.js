import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import copy from 'copy-to-clipboard';

import ButtonDanger from '../../utility/button_danger';
import AlertConfirmation from '../../utility/alert_confirmation';

export default class CopyLink extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }
  copyLink(e) {
    e.preventDefault();
    const projectId = this.props.projectId;
    copy("Visit: groupup.com/" + projectId + ". Create an account, and click on the project named example.");
    this.setState({ copied: true });
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Share The Link With Students</h3>
        </div>
        <div className="panel-body">
          <h3 className="text-center margin-bottom">groupup.com/{this.props.projectId}</h3>
          <p>
            Student Instructions:
          </p>
          <ol ref="instructions" className="margin-bottom">
            <li>
              Visit groupup.com/{this.props.projectId}
            </li>
            <li>
              Create a student account
            </li>
            <li>
              Click on the project named "{this.props.name}"
            </li>
          </ol>
          <div className="col-sm-8 col-center">
            <ButtonDanger onClick={this.copyLink.bind(this)} text="Copy Link & Instructions" />
            { this.state.copied ? <AlertConfirmation message="Link copied to clipboard. Paste in email to students." /> : null }
          </div>
        </div>
      </div>
    );
  }
}
