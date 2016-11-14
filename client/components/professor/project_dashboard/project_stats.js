import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class ProjectStats extends Component {
  constructor(props) {
    super(props);
    this.state = { projectStats: null };
  }

  groupStats() {
    Meteor.call('getGroupStats', this.props.projectId, function(e, result) {
      this.setState({ projectStats: result });
    }.bind(this));
  }

  componentDidMount() {
    this.groupStats();
  }

  render() {
    if (this.state.projectStats === null) {return <span>Loading...</span>}
    console.log("COOL!");
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Project Statistics</h3>
        </div>
        <div className="panel-body">
          <row>
            <div className="col-sm-3 text-center">
              <p># of filled groups: </p>
              <h3>{this.state.projectStats.classified_groups.filled.length}</h3>
            </div>
            <div className="col-sm-3 text-center">
              <p># of unfilled groups: </p>
              <h3>{this.state.projectStats.classified_groups.too_small.length}</h3>
            </div>
            <div className="col-sm-3 text-center">
              <p># of student grouped: </p>
              <h3>{this.state.projectStats.num_grouped}</h3>
            </div>
            <div className="col-sm-3 text-center">
              <p># students not grouped: </p>
              <h3>{this.state.projectStats.num_ungrouped}</h3>
            </div>
          </row>
        </div>
      </div>
    );
  }
}
