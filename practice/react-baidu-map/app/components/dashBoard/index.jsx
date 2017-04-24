/**
 * @file:
 * Created by wind on 17/3/21.
 * @todo:
 */

import React from 'react';

import TopNav from '../topNav';
import Content from '../content';

class dashBoard extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <Content />
      </div>
    );
  }
}

export default dashBoard;
