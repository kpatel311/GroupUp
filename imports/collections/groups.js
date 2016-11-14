import { Meteor } from 'meteor/meteor';
import { Projects } from './projects.js';

Meteor.methods({

  /**
   * Adds a student as a request to a group.
   * @param {String} project_id, project containing student + group
   * @param {String} student_id, student_email of student making requests
   * @param {String} group_title, title of the group
   */
  'groups.joinRequest'(project_id, student_id, group_title){
    const selector = {_id: project_id, "groups.title": group_title};
    const filter = { $push: { "groups.$.requests": student_id} };

    Projects.update(selector, filter);
  },

  /**
   * Moves student from requests list to student_emails list of group and
   * removes student from ungrouped list of project.
   * Fails if student is already in a group or if the group is full.
   * @param {String} student_id of student being accepted
   * @param {String} group_title of group student being added to
   * @param {String} project_id of project containing both groups and students
   * @throws "student-in-team" error if student being accepted to a new team
   * is already in another one
   * @throws "group-at-capacity" error if the group is already at maximum
   * capacity and cannot accept any more teammates
   */
  'groups.acceptRequest'(student_id, group_title, project_id) {
    const projectOfPrevGroup = Projects.findOne(
      {_id: project_id, "groups.student_emails": student_id},
    );
    if (typeof projectOfPrevGroup === "undefined" || !projectOfPrevGroup){
        throw new Meteor.Error("student-in-team", "Student cannot join " +
        "another team because s/he is already in one.");
    }

    const target_proj = Projects.findOne({_id: projectId});
    const max_capacity = target_proj.max_teammates;
    const target_group = Projects.findOne(
      {_id: project_id, "groups.title": group_title},
      { _id: 0, "groups.$": 1 }
    );
    if (target_group.student_emails.length >= max_capacity) {
      throw new Meteor.Error("group-at-capacity",
      "Cannot add student because group is already at maximum number of members"
      );
    }

    Projects.update({_id: project_id, "groups.title": group_title}, {
      $push:{
        "groups.$.student_emails": student_id
      }
    });

    Projects.update({_id: project_id}, {
      $pull: {
        "ungrouped": student_id
      }
    });
    return true;
  },

  /**
   * Adds a group to a project if the students in the new group are not already
   * in a group. Removes students from project's ungrouped list before adding
   * the new group.
   * @throws Error code 1 if students making new group are not ALL already
   * ungrouped
   * @param {String} project_id of project to add group
   * @param {title: {String}, student_emails: {List of Strings}} student emails
   * of students being added to the new group
   */
  'projects.addGroupToProject'(project_id, group_data) {
    const title = group_data.title;
    const grouped_students = group_data.student_emails;
    const new_group = {
      title: title,
      student_emails: grouped_students
    };

    const proj = Projects.findOne({_id: project_id});
    grouped_students.forEach(function(val){
      if (!proj.ungrouped.includes(val)) {
        throw new Meteor.Error("student-in-team", "Student(s) is already in "+
        " a team and cannot make a new team.");
      }
    });

    Projects.update({_id: project_id}, {
      $pull: {
        'ungrouped': {
          $in: grouped_students
        }
      }
    });

    Projects.update({_id:project_id}, {
      $push:{
        'groups': new_group
      }
    });
  },

  /**
   * Removes a student from a project. If the student is in a group and removing
   * that student from the group reduces the group to size 0, the group is also
   * removed.
   * @param {String} project_id of the project that the student is in
   * @param {String} student_email email id of the student to remove
   */
  'projects.removeStudentFromProject'(project_id, student_email) {
    // Check if a student is ungrouped and remove.
    Projects.update({_id:project_id}, {
      $pull:{
        'ungrouped': student_email
      }
    });

    // If not in ungrouped, remove from groups
    Projects.update({_id:project_id}, {
      "groups": {
        $pull: {
          "student_emails": student_email
        }
      }
    });

    // Remove groups whose size are zero.
    Projects.update({_id: project_id}, {
        $pull:{
          "groups": {
            "student_emails": {$size: 0}
          }
        }
    });
  },

  /**
   * Removes a student from a group. If the group is empty as a result, it also
   * removes the group entirely.
   * @param {String} student_email of student to be removed
   * @param {String} group_title of group that the student is being removed from
   * @param {String} project_id of project containing student and group
   */
  'projects.removeStudentFromGroup'(student_email, group_title, project_id) {
    Projects.update({_id: project_id, "groups.title": group_title}, {
      $pull:{
        'groups.$.student_emails': student_email
      }
    });

    Projects.update({_id: project_id, "groups.title": group_title}, {
        $pull:{
          "groups.$": {
            "student_emails": {$size: 0}
          }
        }
    });

    Projects.update({_id: project_id}, {
      $push:{
        "ungrouped": student_email
      }
    });
  },

  /**
   * Adds a student to a group.
   * @TODO Check to see if adding student to the group exceeds class limits
   * @param {String} student_email of student being added
   * @param {String} group_title of group student being added to
   * @param {String} project_id of project containing student and group
   */
  'projects.addStudentToGroup' (student_email, group_title, project_id) {
    Projects.update({_id:idSelector, "groups.title": group_title}, {
      $push:{
        "groups.$.student_emails": student_email
      }
    });
  }
});
