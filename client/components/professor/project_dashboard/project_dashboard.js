import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import PageTitle from '../../utility/page_title';
import Back from '../../utility/back';
import CopyLink from './copy_link';
import ProjectDetails from './project_details';
import ProjectManagement from './project_management';
import ProjectStats from './project_stats';
import { Projects } from '../../../../imports/collections/projects';

class ProjectDashboard extends Component {
  render() {
    console.log(this.props.project);
    if(!this.props.ready){return <span>Loading...</span>}
    return (
      <div className="row">
        <div className="col-sm-8 col-center">
          <Back link="/professor-dashboard" />
          <PageTitle title="Project Dashboard: Example Project" />
          <CopyLink projectId={this.props.project._id} name={this.props.project.name}/>
          <ProjectDetails project={this.props.project}/>
          <ProjectStats projectId={this.props.project._id}/>
          <ProjectManagement projectId={this.props.project._id}/>
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
}, ProjectDashboard);
