import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'projects.remove'(projectId) {
    const project = Projects.findOne(projectId);
    Projects.remove(projectId);
  },

  'projects.insert'(data) {
    Projects.insert({
      professor: data.professor,
      name: data.name,
      link: data.link,
      createdAt: new Date(),
      description: data.description,
      deadline: data.deadline,
      min_teammates: data.min_teammates,
      max_teammates: data.max_teammates,
      skills: data.skills,
      ungrouped: data.ungrouped,
      groups: data.groups,
      csv_name: data.csv_name,
    });
  },

  'projects.update'(project_id, data) {
    Projects.update(project_id, {$set: {
        professor: data.professor,
        name: data.name,
        link: data.link,
        createdAt: new Date(),
        description: data.description,
        deadline: data.deadline,
        min_teammates: data.min_teammates,
        max_teammates: data.max_teammates,
        skills: data.skills,
        ungrouped: data.ungrouped,
        groups: data.groups,
        csv_name: data.csv_name,
      }
    });
  },

  'projects.addStudentToProject'(student_email, project_id) {
    // Check if student is already in the project_id
    const project = Projects.findOne({_id: project_id}, {
      $or: [
        {"ungrouped": student_email},
        {"groups.student_emails": student_email}
      ]
    });
    if (typeof project === "undefined" || !project) {

      Projects.update({_id: project_id}, {
        $push:{
          "ungrouped": student_email
        }
      });
    }
  },

});

export const Projects = new Mongo.Collection('projects');
