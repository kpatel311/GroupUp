import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Projects } from '../../imports/collections/projects.js';
import { chai } from 'meteor/practicalmeteor:chai';
import { ProjectFactoryObject } from './projectFactory';
import { Factory } from 'meteor/dburles:factory';

// Generates a project and inserts it into a dummy database
Factory.define('project', Projects, ProjectFactoryObject);

describe('project', function() {
  // Empties mock database before each test
  beforeEach( function () {
    resetDatabase();
  });

  // Adds project to database and checks to see if project is added correctly
  it('Inserts new projects correctly', function() {
    const inserted_list = Factory.create('project');
    const retrieved_list = Projects.findOne({});
    chai.assert.equal(inserted_list._id, retrieved_list._id);
    chai.assert.equal(inserted_list.ungrouped[0], retrieved_list.ungrouped[0]);
    chai.assert.equal(inserted_list.description, retrieved_list.description);
  });

  // TODO: Figure out how to call meteor methods within Mocha.
  // Should add a project to the mock database and retrieve groups from that
  // project
  it('Retrieves groups correctly', function () {
    const inserted_list = Factory.create('project');
    const inserted_groups = inserted_list.groups;
    const retrieved_groups = Meteor.call("groupsInProject", inserted_list._id,
    function(error, result){
      console.log(result);
      if(error){
        chai.assert.equal(0, 1);
      }
      if(result){
         chai.assert.equal(inserted_groups, result.groups);
      }
    });
  });

});
