/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */

import React from 'react';

import { baiduWrapper } from '../Map';
import BasicMap from '../basicMap';

export class Content extends React.Component {
  render() {
    return (
      <div className="container">
        <BasicMap />
      </div>
    );
  }
}

export default baiduWrapper({
  ak: 'cQoqZZ4o1Yy96sEiIlIVkkek'
})(Content);
