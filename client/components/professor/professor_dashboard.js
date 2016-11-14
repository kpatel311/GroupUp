import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import Card from '../utility/card';
import { Projects } from '../../../imports/collections/projects';

const NEW_PROJECT_ID = "new-project";

class ProfessorDashboard extends Component {
  render() {
    return(
      <div className="container">

        <div className="row">
          <div className="col-md-8 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Professor Dashboard</h3>
              </div>
              <div className="panel-body">
                <h4>
                  Welcome! GroupUp is a tool for students to create groups for class projects.
                  Click below to create a class project, set a group formation deadline, and import students.
                </h4>

                <div className="row">
                  <div className="col-md-8 col-center">
                      <Link to={"/create-project/" + NEW_PROJECT_ID}>
                        <button
                          className="btn btn-default btn-raised btn-block">
                          New Class Project
                        </button>
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="margin-bottom"></div>

        <div className="row">
          {this.props.projects.map(project =>
            <Card key={project._id} title={project.name} message={project.description} link={"/project-dashboard/" + project._id} buttonText="Project Settings"/>
          )}
        </div>

      </div>
    );
  }
}


export default createContainer(() => {
  Meteor.subscribe('projects', 5);
  return { projects: Projects.find({}).fetch() };
}, ProfessorDashboard);
