Slingshot.fileRestrictions("UsersAvatar", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: 10 * 500 * 500 // 10 MB (use null for unlimited)
});


Slingshot.createDirective("UsersAvatar", Slingshot.S3Storage, {
  AWSAccessKeyId: "AKIAIKAXICM5QB2KJYTA",
  AWSSecretAccessKey: "mibhiV6Ta8cn8LEA4qo7PF+USLsGiCv7WmIrG3Rc",
  bucket: "group-up-images", // change this to your s3's bucket name
  acl: "public-read",

  authorize: function (file, metaContext) {

    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file, metaContext) {
    // User's image url with ._id attached:
    return metaContext.avatarId + "/" + Date.now() + "-" + file.name;
  }
});
