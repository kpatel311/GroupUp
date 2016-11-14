import React, { Component } from 'react';
import ManuallyGroupStudentItem from './manually_group_student_item';

export default class ManuallyGroupStudentGroupsPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <input type="radio" id="groupRadioButton" name="pushToGroup" />
          {this.props.title}
        </div>
        <div className="list-group-orig panel-body">
          {this.props.group.map(student =>
            <ManuallyGroupStudentItem email={student.email} />
          )}
        </div>
      </div>
    )
  }   
}