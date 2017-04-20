/**
 * Created by wind on 17/4/19.
 * reference from: Fullstack.io <us@fullstack.io>
 * reference git: https://github.com/fullstackreact/google-maps-react.git
 * todo: cache js file.
 */
let counter = 0;
const scriptMap = window.SCRIPTMAP || new Map();

export const ScriptCache = ((GLOBAL) => {
  window.SCRIPTMAP = GLOBAL.SCRIPTMAP || scriptMap;
  return (scripts) => {
    const Cache = {};

    Cache.onLoadFunc = key => (callback) => {
      const stored = scriptMap.get(key);
      if (stored) {
        stored.promise.then(() => {
          if (stored.error) {
            callback(stored.error);
          } else {
            callback(null, stored);
          }
          return stored;
        });
      } else {
        // TODO
      }
    };

    Cache.scriptTag = (key, src) => {
      if (!scriptMap.has(key)) {
        const tag = document.createElement('script');
        const promise = new Promise((resolve, reject) => {
          const body = document.getElementsByTagName('body')[0];
          tag.type = 'text/javascript';
          tag.async = false;
          const callbackName = `loadCallback${counter += 1}${Date.now()}`;

          function handleResult(state) {
            return (evt) => {
              const stored = scriptMap.get(key);
              if (state === 'loaded') {
                stored.resolved = true;
                resolve(src);
              } else if (state === 'error') {
                stored.errored = true;
                reject(evt);
              }
            };
          }

          tag.onload = handleResult('loaded');
          tag.onerror = handleResult('error');

          tag.onreadystatechange = () => {
            handleResult(tag.readyState);
          };

          let srcReal = src;
          if (src.match(/callback=CALLBACK_NAME/)) {
            srcReal = src.replace(/(callback=)[^&]+/, `$1${callbackName}`);
            window[callbackName] = tag.onload;
          } else {
            tag.addEventListener('load', tag.onload);
          }
          tag.addEventListener('error', tag.onerror);

          tag.src = srcReal;
          body.appendChild(tag);
        });

        const loaded = false;
        const error = false;

        const initialState = { loaded, error, promise, tag };
        scriptMap.set(key, initialState);
      }
    };

    Object.keys(scripts).forEach((key) => {
      const script = scripts[key];
      const tag = GLOBAL.SCRIPTMAP.has(key)
        ? GLOBAL.SCRIPTMAP.get(key).tag
        : Cache.scriptTag(key, script);

      Cache[key] = { tag, onLoad: Cache.onLoadFunc(key) };
    });

    return Cache;
  };
})(window);

export default ScriptCache;

