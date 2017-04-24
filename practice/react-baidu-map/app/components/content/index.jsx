/**
 * @file:
 * Created by wind on 17/4/18.
 * @todo:
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaiduMap, { wrapper as baiduWrapper } from '../baiduMap';

class Content extends React.Component {
  render() {
    const sharedProps = {
      loaded: this.props.loaded
    };
    return (
      <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <BaiduMap {...sharedProps} />
      </div>
    );
  }
}

Content.propTypes = {
  loaded: PropTypes.bool
};

Content.defaultProps = {
  loaded: false
};

export default baiduWrapper({ ak: 'cQoqZZ4o1Yy96sEiIlIVkkek' })(Content);
