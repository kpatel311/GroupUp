import { Meteor } from 'meteor/meteor'; 

Meteor.methods({
  // Adds the about me object to a users profile.
  'updateProfile'(aboutMe){
    if (this.userId) {
      Meteor.users.update(this.userId, { $push:
        {about_me: aboutMe}
      });
    }
  }
});
