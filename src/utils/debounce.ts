/* eslint-disable @typescript-eslint/no-explicit-any */
const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};

export default debounce;
