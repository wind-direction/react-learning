/**
 * Created by wind on 17/4/19.
 */
import React from 'react';

import { ScriptCache } from './scriptCache';
import BaiduMapWebApi from './baiduMapWebApi';

const defaultCreateCache = (opt) => {
  const options = opt || {};
  const apiKey = options.ak;
  const version = options.v || '2.0';
  return ScriptCache({
    baidu: BaiduMapWebApi({ ak: apiKey, v: version })
  });
};
export const wrapper = options => (WrappedComponent) => {
  const createCache = options.createCache || defaultCreateCache;
  console.log('-------------------');
  console.log(options);
  console.log('-------------------');

  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.scriptCache = createCache(options);
      this.scriptCache.baidu.onLoad(this.onLoad.bind(this));

      this.state = {
        loaded: false,
        map: null,
        baidu: null
      };
    }

    onLoad() {
      this.BAIDUAPI = window.baidu;
      this.setState({
        loaded: true,
        baidu: this.BAIDUAPI
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        baidu: window.baidu
      });
      console.log('ddd');

      return (
        <div>
          <WrappedComponent {...props} />
        </div>
      );
    }
  }
  return Wrapper;
};

export default wrapper;
