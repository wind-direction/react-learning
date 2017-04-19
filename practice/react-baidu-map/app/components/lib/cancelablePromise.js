/**
 * Created by wind on 17/4/19.
 */
const makeCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) => {
      if (hasCanceled) {
        reject({ isCanceled: true });
      } else {
        resolve(val);
      }
    });
    promise.catch((error) => {
      if (hasCanceled) {
        reject({ isCanceled: true });
      } else {
        resolve(error);
      }
    });
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    }
  };
};

export default makeCancelable;
