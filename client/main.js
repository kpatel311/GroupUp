import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Splash from './components/login/splash';
import Registration from './components/login/registration';
import ConfirmationAccount from './components/utility/confirmation_account';
import ConfirmationCreateProject from './components/utility/confirmation_create_project';
import CreateProjectForm from './components/professor/create_project_form';
import ProfessorDashboard from './components/professor/professor_dashboard';
import ProjectDashboard from './components/professor/project_dashboard/project_dashboard.js';
import ManuallyGroupStudents from './components/professor/manually-group/manually_group_page';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path="registration/:userType" component={Registration} />
      <Route path="confirmation-account" component={ConfirmationAccount} />
      <Route path="confirmation-create-project" component={ConfirmationCreateProject} />
      <Route path="create-project/:projectId" component={CreateProjectForm} />
      <Route path="professor-dashboard" component={ProfessorDashboard} />
      <Route path="project-dashboard/:projectId" component={ProjectDashboard} />
      <Route path="manually-group-students/:projectId" component={ManuallyGroupStudents} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
