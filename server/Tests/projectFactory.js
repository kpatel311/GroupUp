import faker from 'faker';
import { Projects } from '../../imports/collections/projects.js';

export const ProjectFactoryObject = {
  professor: () => faker.fake("{{name.lastName}}"),
  name: () => faker.fake("{{lorem.word}}"),
  link: () => faker.fake("{{internet.url}}"),
  createdAt: () => new Date(),
  description: () => faker.fake("{{lorem.sentence}}"),
  deadline: () => new Date(),
  min_teammates: () => 3,
  max_teammates: () => 5,
  skills: () => faker.fake("{{lorem.word}}"),
  ungrouped: function() {
    let arr = new Array();
    for (let i = 0; i < 10; i++) {
      arr.push(faker.internet.email());
    }
    return arr;
  },
  groups: function() {
    let arr = new Array();
    let group_obj;
    for (let i = 0; i < 10; i++) {
      let arr2 = new Array();
      let title = faker.lorem.word();
      for (let i = 0; i < 5; i++) {
        arr2.push(faker.internet.email());
      }
      group_obj = {
        "title": title,
        "student_emails": arr2,
      }
      arr.push(group_obj);
    }
    return arr;
  },
};
