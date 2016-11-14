import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '../../../../imports/collections/projects';
import ManuallyGroupStudentGroupsPanel from './manually_group_student_groups_panel';
import ManuallyGroupStudentItem from './manually_group_student_item';

let ungrouped = [];
let grouped = [];
let setInitState = true;

class ManuallyGroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ungrouped: ungrouped, grouped: grouped };
  }

  resetState() {
    ungrouped = this.props.project.ungrouped;
    grouped = this.props.project.groups;
    this.setState({ ungrouped: ungrouped, grouped: grouped });
  }

  moveToGrouped() {
    var groupRadios = document.getElementsByName('pushToGroup');
    var x = -1;
    for (var n = 0; n < groupRadios.length; n++) {
      if (groupRadios[n].checked) {
        x = n;
      }
    }

    $('#ungrouped .active').each(function(index) {
      var text = $(this).text();
      grouped[x].students.push({ email: text });
      for (var i = 0; i < ungrouped.length; i++) {
        if (ungrouped[i].email === text) {
          ungrouped.splice(i, 1);
        }
      }
      $(this).removeClass('active');
    });
    this.setState({ ungrouped: ungrouped, grouped: grouped });
  }

  moveToUngrouped() {
    $('#grouped .active').each(function(index) {
      var text = $(this).text();
      ungrouped.push({ email: text });
      for (var i = 0; i < grouped.length; i++) {
        for (var j = 0; j < grouped[i].students.length; j++) {
          if (grouped[i].students[j].email === text) {
            grouped[i].students.splice(j, 1);
          }
        }
      }
      $(this).removeClass('active');
    });
    this.setState({ ungrouped: ungrouped, grouped: grouped });
  }

  updateProjectsWithNewGroups() {
    Meteor.call('projects.update', this.props.params.projectId, {
      professor: Meteor.userId(),
      name: this.props.project.name,
      description: this.props.project.description,
      deadline: this.props.project.deadline,
      min_teammates: this.props.project.min_teammates,
      max_teammates: this.props.project.max_teammates,
      skills: this.props.project.skills,
      ungrouped: ungrouped,
      groups: grouped,
      csv_name: this.props.project.csv_name,
    });
  }

  render() {
    if (!this.props.ready) { return <span>Loading...</span> }
    if (this.props.ready && setInitState) {
      setInitState = false;
      this.resetState();
    }

    return(
      <div className="container">

        <div className="row">
          <div className="col-md-8 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Manually Group Students</h3>
              </div>
              <div className="panel-body">
                <h4>
                  Select students with the checkbox next to their name and then click
                  the right arrow button to group the students in a group. Click on the
                  checkbox next to a group student and then click the left arrow button
                  to ungroup that student.
                </h4>
                <br></br>
                <h4>
                  If you have inputted a new CSV file and the results are below are not correct, please refresh the page.
                </h4>

                <div className="col-sm-3 col-center">
                  <form method="POST">
                    <button
                      className="btn btn-default btn-raised btn-block"
                      onClick="">
                      Refresh
                    </button>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="row top-buffer">
          <div className="col-sm-5">
            <div className="panel panel-default">
              <div className="panel-heading">Ungrouped Students</div>
              <div id="ungrouped" className="list-group-orig panel-body">
                {this.state.ungrouped.map(student =>
                  <ManuallyGroupStudentItem email={student.email} />
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-2">
            <button
              className="btn btn-default btn-raised btn-block"
              onClick={this.moveToGrouped.bind(this)}>
              &gt;
            </button>
            <button
              className="btn btn-default btn-raised btn-block"
              onClick={this.moveToUngrouped.bind(this)}>
              &lt;
            </button>
          </div>

          <div id="grouped" className="col-sm-5">
            <form action="">
            {this.state.grouped.map(group =>
              <ManuallyGroupStudentGroupsPanel title={group.name} group={group.students} />
            )}
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-2 col-center">
            <form method="POST">
              <button
                className="btn btn-default btn-raised btn-block"
                onClick={this.updateProjectsWithNewGroups.bind(this)}>
                Confirm
              </button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default createContainer((props) => {
  return {
    ready: Meteor.subscribe('projectsById', props.params.projectId).ready(),
    project: Projects.findOne(props.params.projectId)
  }
}, ManuallyGroupPage);

