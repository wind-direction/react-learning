import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

class Profile1 extends React.Component {
  render() {
    return (
      <div className="profile-component">
        <h1>我的名字叫 {this.props.name}</h1>
        <h1>我今年 {this.props.age}</h1>
      </div>
    );
  }
}

Profile1.propTypes = propTypes;

export default Profile1;

