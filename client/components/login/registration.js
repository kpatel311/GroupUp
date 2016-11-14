import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import WarningMessage from '../utility/warning_message';

const MAX_SIZE = 3000000;

export default class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { warning: false };
  }

  componentWillMount(){
    // we create this rule both on client and server
    Slingshot.fileRestrictions("avatar", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
      maxSize: 10 * 500 * 500
    });
  }

  uploadImage() {
    if(this.refs.image.files[0] == null) {
      return "/images/facebook-avatar.jpg";
    }
    var userId = Meteor.user()._id;
    var metaContext = {avatarId: userId};
    var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
    uploader.send(this.refs.image.files[0], function (error, downloadUrl) {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
        alert (error);
      }
      else {
        //Update user
        Meteor.call('updateUserImage', Meteor.userId(), downloadUrl);
      }
    }.bind(this));
  }

  selectImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      this.setState({ warning: true });
      return;
    } else {
      if (this.state.warning) {
        this.setState({ warning: false });
      }
    }

    this.refs.profileImagePreview.src = "/images/loading.gif";
    const reader = new FileReader();
    reader.onload = function (e) {
      const uploadedImage = e.target.result;
      this.refs.profileImagePreview.src = uploadedImage;
    }.bind(this)
    reader.readAsDataURL(file);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;

    if (password == confirmPassword && password != "" && confirmPassword != "" && email != "") {
      const isProfessor = this.props.params.userType == "professor";

      const accountInfo = {
        email: email,
        password: password,
        profile: {
          isProfessor: isProfessor,
        }
      };
      Accounts.createUser(accountInfo, function(e) {
        if(e) {
          console.log(e);
        } else {
          Meteor.loginWithPassword(email, password, function(e) {
            if(e) {
              console.log(e);
            } else {
              this.uploadImage();
              browserHistory.push('/confirmation-account');
            }
          }.bind(this));
        }
      }.bind(this));
    } else {
        console.log("Not equal");
    }
  }

  goBack(event) {
    event.preventDefault();

    browserHistory.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <button onClick={this.goBack.bind(this)}
              className="btn btn-raised btn-default">
              &larr; Back</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3>Create a {this.props.params.userType} account:</h3>
              </div>

              <div className="panel-body">
                <form className="col-sm-8 col-center">
                  <div className="col-sm-8 col-center">
                    <div className="form-group">
                      <img ref="profileImagePreview" src="/images/facebook-avatar.jpg" className="img-rounded img-responsive col-center" />
                    </div>
                    <label className="btn btn-raised btn-block btn-file">
                      Upload Profile Image <input ref="image" onChange={this.selectImage.bind(this)} className="display-none" type="file" name="imgFile" accept="image/png, image/jpeg, image/gif" />
                    </label>
                    { this.state.warning ? <WarningMessage message="Image size is too large. Please use an image < 3mb" /> : null }

                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="email" type="text" placeholder="Enter email..." />
                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="password" type="password" placeholder="Enter password..." />
                  </div>
                  <div className="form-group margin-bottom">
                    <input className="form-control" ref="confirmPassword" type="password" placeholder="Confirm password..." />
                  </div>
                </form>

                <div className="row">
                  <div className="col-sm-6">
                    <button
                      onClick={this.goBack.bind(this)}
                      className="btn btn-raised btn-danger btn-block">
                      CANCEL
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <button
                      onClick={this.onSubmit.bind(this)}
                      className="btn btn-raised btn-default btn-block">
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
