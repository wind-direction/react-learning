/**
 * Created by wind on 17/4/19.
 */
function BaiduMapWebApi(options) {
  const opts = options || {};
  const apiKey = opts.apiKey;
  const URL = 'http://api.map.baidu.com/api';
  const version = opts.version || '2.0';

  const url = () => {
    const urlString = URL;
    const params = {
      ak: apiKey,
      v: version,
      callback: 'CALLBACK_NAME'
    };

    const paramsStr = Object.keys(params)
      .filter(k => !!params[k])
      .map(k => `${k}=${params[k]}`).join('&');

    return `${urlString}?${paramsStr}`;
  };

  return url();
}

export default BaiduMapWebApi;
