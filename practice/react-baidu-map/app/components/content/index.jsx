/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */

import React from 'react';

import { baiduWrapper } from '../baiduMap';
import BasicMap from '../basicMap';

export class Content extends React.Component {
  render() {
    const sharedProps = {};
    return (
      <div className="container">
        <BasicMap {...sharedProps} />
      </div>
    );
  }
}

export default baiduWrapper({
  ak: 'cQoqZZ4o1Yy96sEiIlIVkkek'
})(Content);
