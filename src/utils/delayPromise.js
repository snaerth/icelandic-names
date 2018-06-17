/**
 * Delays function execution in milliseconds
 *
 * @param {Number} duration - Time in milliseconds
 * @returns {Promise}
 * @example
 * delayPromise(100) - Delays execution by 100 ms
 */
export default function delayPromise(delay) {
  //return a arrow that accepts a single variable
  return data => {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  };
}
