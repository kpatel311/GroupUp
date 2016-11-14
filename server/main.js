import { Meteor } from 'meteor/meteor';
import { Projects } from '../imports/collections/projects.js';
import { getGroupStats } from './GroupStats/GroupStatHelpers.js';

Meteor.startup(() => {
  Meteor.methods({
    'updateUserImage'(userId, image) {
      Meteor.users.update(userId, {$set: {"profile.image": image}});
    },

    'parseCSV'(csvFile) {
      var parse = require('csv-parse/lib/sync');
      return parse(csvFile, {columns: true});
    },

    'getGroupStats'(projectId) {
      return getGroupStats(projectId);
    },
  });

  Meteor.publish('projects', function(limit) {
    return Projects.find({"professor": this.userId}, {'limit': limit});
  });

  Meteor.publish('allProjects', function() {
    console.log("USER " + this.userId);
    return Projects.find({"professor": this.userId});
  });

  Meteor.publish('projectsById', function(projectId) {
    return Projects.find({"_id": projectId});
  });

  Meteor.publish("groupsInProject", function(projectId){
    return Projects.findOne({"_id": projectId}, {fields: Projects.groups});
  });

  Meteor.publish("projectsByStudentId", function(student_email) {
    return Projects.find({ $or: [
        {"ungrouped": student_email},
        {"groups.student_emails": student_email},
      ]},
    {});
  });

  Meteor.publish("aboutMeByProjectId", function(userId, projectId) {
    const selector = { _id: userId, "about_me.projectId": projectId };
    const filter = { 'about_me.$': 1 };

    return Meteor.users.findOne(selector, filter);
  });

});
