/**
 * Created by wind on 17/4/19.
 */
function BaiduMapWebApi(options) {
  const opts = options || {};
  const apiKey = opts.ak;
  const URL = 'http://api.map.baidu.com/getscript';
  const version = opts.v || '2.0';

  const url = () => {
    const urlString = URL;
    const params = {
      ak: apiKey,
      v: version
    };

    const paramsStr = Object.keys(params)
      .filter(k => !!params[k])
      .map(k => `${k}=${params[k]}`).join('&');

    return `${urlString}?${paramsStr}`;
  };

  return url();
}

export default BaiduMapWebApi;
