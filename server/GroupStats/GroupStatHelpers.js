import { Projects } from '../../imports/collections/projects.js';

/**
 * Grabs a project matching the ID from the database
 * @param  {string} projectId object id of project in db
 * @return {Project object} see GroupUp/imports/collections/projects.js
 */
function getProjectById(projectId) {
  return Projects.findOne({_id: projectId});
}

/**
 * Generates a 1-d array of grouped students for easier parsing
 * @param  {list of Group objects} groups_list [represents groups]
 * @return {[list of strings]}         [list of all student emails in groups]
 */
function getAllGroupedStudents(groups_list) {
  let grouped_students = [];
  let curr_group;
  let curr_emails;
  for (let i = 0; i < groups_list.length; i++) {
    curr_group = groups_list[i];
    curr_emails = curr_group.student_emails;
    for (let j = 0; j < curr_group.length; j++) {
      grouped_students.push(curr_group[j]);
    }
  }
  return grouped_students;
}

/**
 * Generates total number of students
 * @param  {list of strings} grouped_students
 * @param  {list of strings} ungrouped_students
 * @return {int} total number of students
 */
function getNumberOfStudents(grouped_students, ungrouped_students) {
  return grouped_students.length + ungrouped_students.length;
}

/**
 * Returns a list of all students given a list of grouped and ungrouped students
 */
function getAllStudents(grouped_students, ungrouped_students) {
  const all_students = grouped_students.concat(ungrouped_students);
  return all_students;
}

/**
 * Classifies groups based on ability to add more students
 * @param  {int} min Smallest number of students allowed in a group
 * @param  {int} max Largest number of students allowed in a group
 * @param  {list of group objects} groups_list student groups
 * @return {groupClassification} Has 3 properties number of valid, too small
 * and filled groups
 */
function classifyGroups(min, max, groups_list) {
  let groupClassification = {
    valid: [],
    too_small: [],
    filled: [],
  };

  let curr_group;
  let curr_emails;
  for (let i = 0; i < groups_list.length; i++) {
    curr_group = groups_list[i];
    curr_emails = curr_group.student_emails;
    if (curr_group.length < min) {
      groupClassification.too_small.concat(curr_group);
    } else if (curr_group.length == max) {
      groupClassification.filled.concat(curr_group);
    } else {
      groupClassification.valid.concat(curr_group);
    }
  }

  return groupClassification;
}

function getGroupStats(projectId) {
    let proj = getProjectById(projectId);
    let grouped_students = getAllGroupedStudents(proj.groups);
    let num_students = getNumberOfStudents(grouped_students, proj.ungrouped);
    let student_list = getAllStudents(grouped_students, proj.ungrouped);
    let classified_groups = classifyGroups(proj.min_teammates,
                                           proj.max_teammates,
                                           proj.groups);
    return {
      "num_students": num_students,
      "num_grouped": grouped_students.length,
      "num_ungrouped": proj.ungrouped.length,
      "classified_groups": classified_groups,
      "all_students": student_list,
    };
}

export { getGroupStats };
