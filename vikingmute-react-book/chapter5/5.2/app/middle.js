var store = {
  dispatch : function(action){
    console.log('origin dispatch:['+action+']');
  }
};

var patchStoreToAddLogging = function(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log('patchStoreToAddLogging.dispatchAndLog:['+action+']');
    let result = next(action);
    console.log('patchStoreToAddLogging.next:['+action+']');
    return result;
  }
};

var patchStoreToAddCrashReporting = function(store) {
  let next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    console.log('patchStoreToAddCrashReporting.dispatchAndReportErrors:['+action+']');
    try {
      return next(action);
    } catch (err) {
      console.error('Caught an exception!', err);
      throw err;
    }
  }
};

patchStoreToAddLogging(store);
patchStoreToAddCrashReporting(store);

store.dispatch(new Error());