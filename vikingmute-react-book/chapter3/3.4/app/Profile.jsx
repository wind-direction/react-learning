import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div className="profile-component">
        <h1>我的名字叫 {this.props.name}</h1>
        <h1>我今年 {this.props.age}</h1>
      </div>
    );
  }
}


Profile.propTypes = {
  name: React.PropTypes.string.isRequired,
  age: React.PropTypes.number.isRequired
};

export default Profile;
