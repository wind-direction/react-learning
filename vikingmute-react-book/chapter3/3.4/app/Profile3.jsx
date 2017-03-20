import React, { PropTypes } from 'react';
import Hobby from './Hobby';

const propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

class Profile3 extends React.Component {
  constructor() {
    super();
    // 在state中添加两个爱好
    this.state = {
      liked: 0,
      hobbies: ['skateboarding', 'rock music']
    };
    this.likeCallback = this.likeCallback.bind(this);
  }

  likeCallback() {
    let liked = this.state.liked;
    liked += 1;
    this.setState({
      liked
    });
  }
  render() {
    return (
      <div>
        <h1>我的名字叫{this.props.name}</h1>
        <h1>我今年{this.props.age}</h1>
        <button onClick={this.likeCallback}>给我点赞</button>
        <h2>总点赞数: {this.state.liked}</h2>
        <h2>我的爱好:</h2>
        <ul>
          {this.state.hobbies.map((hobby, i) => <Hobby name={i} hobby={hobby} />)}
        </ul>
      </div>
    );
  }
}

Profile3.propTypes = propTypes;

export default Profile3;

