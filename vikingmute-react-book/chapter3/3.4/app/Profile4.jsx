import React, { PropTypes } from 'react';
import Hobby from './Hobby';

const propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};

class Profile4 extends React.Component {
  constructor() {
    super();
    // 在state中添加两个爱好
    this.state = {
      liked: 0,
      hobbies: ['skateboarding', 'rock music']
    };
    this.likeCallback = this.likeCallback.bind(this);
    this.addHobbyCallback = this.addHobbyCallback.bind(this);
  }

  likeCallback() {
    let liked = this.state.liked;
    liked += 1;
    this.setState({
      liked
    });
  }

  addHobbyCallback() {
    // 用this.refs.name来获取节点
    const hobbyInput = this.hobby;
    const val = hobbyInput.value;
    if (val) {
      let hobbies = this.state.hobbies;
      // 添加值到数组
      hobbies = [...hobbies, val];
      // 更新state
      this.setState({
        hobbies
      }, () => {
        hobbyInput.value = '';
      });
    }
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
          {this.state.hobbies.map((hobby, i) => <Hobby key={i} hobby={hobby} />)}
        </ul>
        <input type="text" ref={(input) => { this.hobby = input; }} />
        <button onClick={this.addHobbyCallback}>添加爱好</button>
      </div>
    );
  }
}

Profile4.propTypes = propTypes;

export default Profile4;

