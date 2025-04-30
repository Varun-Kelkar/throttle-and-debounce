export function debounce(functiontoCall, timer) {
    let timeOutId;
    return function (...args) {
      const context = this;
      const params = args;
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        functiontoCall.apply(context, params);
      }, timer);
    };
  }
  