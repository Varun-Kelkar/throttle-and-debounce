export function throttle(callback, timer) {
    let hasIntervalPassed = true;
    return function (...args) {
      const context = this;
      const params = args;
  
      if (hasIntervalPassed) {
        callback.apply(context, params);
        hasIntervalPassed = false;
      }
  
      setTimeout(() => {
        hasIntervalPassed = true;
      }, timer);
    };
  }
  