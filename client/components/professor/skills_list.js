import React, {Component} from 'react';

export default class SkillsList extends Component {
  constructor(props) {
    super(props);
  }

  renderSkills() {
    return this.props.skills.map(skill => {
      return (
          <div key={skill.id} className="alert alert-dismissible alert-primary">
              <button
                onClick={(e) => {
                    e.preventDefault();
                    this.props.removeSkill(skill.id);
                }}
                className="close">
                x
              </button>
              {skill.text}
            </div>
      );
    });
  }

  render() {
    return (
      <div>
          {this.renderSkills()}
      </div>
    );
  }
}
