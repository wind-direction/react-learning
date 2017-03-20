import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

class Profile2 extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: 0
    };
    this.likedCallback = this.likedCallback.bind(this);
  }

  likedCallback() {
    let liked = this.state.liked;
    liked += 1;
    this.setState({
      liked
    });
  }

  render() {
    return (
      <div>
        <h1>我的名字叫 {this.props.name}</h1>
        <h2>我今年 {this.props.age}岁</h2>
        <button onClick={this.likedCallback}>给我点赞</button>
        <h2>点赞总数: {this.state.liked}</h2>
      </div>
    );
  }
}

Profile2.propTypes = propTypes;

export default Profile2;

