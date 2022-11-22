const throttle = (func, delay) => {
  let throttled = false;

  const throttledFunc = (...args) => {
    if (throttled) return;

    throttled = true;
    setTimeout(() => {
      throttled = false;
    }, delay);

    func(...args);
  };

  return throttledFunc;
};

export default throttle;
