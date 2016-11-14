import React, { Component } from 'react';

export default class ManuallyGroupStudentItem extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({ classes: "list-group-orig-item" });
  }

  handleSelect() {
    if (this.state.classes == "list-group-orig-item") {
      this.setState({ classes: "list-group-orig-item active" });
    } else {
      this.setState({ classes: "list-group-orig-item" });  
    }
  }

  render() {
    return(
      <a 
        className={this.state.classes}
        onClick={this.handleSelect.bind(this)}>
        {this.props.email}
      </a>
    );
  }
};