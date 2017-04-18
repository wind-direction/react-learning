/**
 * @file:
 * Created by wind on 17/3/21.
 * @todo:
 */

import React from 'react';
import PropTypes from 'prop-types';

import TopNav from '../topNav';
import Content from '../Content';

const propTypes = {
  position: PropTypes.object.isRequired
};

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

dashBoard.propTypes = propTypes;

export default dashBoard;
