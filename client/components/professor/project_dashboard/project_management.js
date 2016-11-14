import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Button from '../../utility/button';
import ButtonDanger from '../../utility/button_danger';

export default class ProjectManagement extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Manage Your Project</h3>
        </div>
        <div className="panel-body">
          <div className="col-sm-8 col-center">
            <ButtonDanger onClick="" text="Randomly Group Students Now" />
            <Button onClick="" text="Add or Remove Students From Project" />
            <Link to={"/manually-group-students/" + this.props.projectId}>
              <Button onClick="" text="Manually Group Students" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
